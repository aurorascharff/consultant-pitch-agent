import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const defaultLocalUrl = "http://127.0.0.1:2000/";
const hasExplicitUrl = args.some(
  (arg) => arg === "--url" || arg.startsWith("--url="),
);

async function isReachable(url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(750),
    });
    await response.body?.cancel();
    return true;
  } catch {
    return false;
  }
}

async function readRecordedDevUrl() {
  try {
    const stateFile = fileURLToPath(
      new URL("./.eve/dev-server-state.v1.json", import.meta.url),
    );
    const state = JSON.parse(await readFile(stateFile, "utf8"));
    return typeof state.url === "string" ? state.url : undefined;
  } catch {
    return undefined;
  }
}

async function quarantineStaleWorkflowState() {
  const eveDir = fileURLToPath(new URL("./.eve/", import.meta.url));
  const workflowDir = path.join(eveDir, ".workflow-data");
  const runsDir = path.join(workflowDir, "runs");
  const snapshotsDir = path.join(eveDir, "dev-runtime", "snapshots");

  try {
    const [runFiles, snapshots] = await Promise.all([
      readdir(runsDir),
      readdir(snapshotsDir).catch(() => []),
    ]);
    const snapshotSet = new Set(snapshots);
    const runs = await Promise.all(
      runFiles
        .filter((file) => file.endsWith(".json"))
        .map(async (file) =>
          JSON.parse(await readFile(path.join(runsDir, file), "utf8")),
        ),
    );
    const hasStaleActiveRun = runs.some(
      (run) =>
        run.status === "running" &&
        typeof run.deploymentId === "string" &&
        !snapshotSet.has(run.deploymentId),
    );

    if (!hasStaleActiveRun) return;

    const quarantineDir = path.join(eveDir, "workflow-quarantine");
    const timestamp = new Date().toISOString().replaceAll(":", "-");
    await mkdir(quarantineDir, { recursive: true });
    await rename(workflowDir, path.join(quarantineDir, timestamp));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const eveArgs = ["eval", ...args];

if (!hasExplicitUrl && !args.includes("--list")) {
  const candidateUrls = [
    process.env.EVE_EVAL_URL,
    await readRecordedDevUrl(),
    defaultLocalUrl,
  ].filter((url, index, urls) => url && urls.indexOf(url) === index);
  let runningUrl;

  for (const url of candidateUrls) {
    if (await isReachable(url)) {
      runningUrl = url;
      break;
    }
  }

  if (runningUrl) {
    console.log(`Using the running eve server at ${runningUrl}`);
    eveArgs.push("--url", runningUrl);
  } else {
    await quarantineStaleWorkflowState();
  }
}

const eveBin = fileURLToPath(
  new URL("./node_modules/eve/bin/eve.js", import.meta.url),
);
const warningFlag = "--disable-warning=MaxListenersExceededWarning";
const nodeOptions = process.env.NODE_OPTIONS?.includes(warningFlag)
  ? process.env.NODE_OPTIONS
  : [process.env.NODE_OPTIONS, warningFlag].filter(Boolean).join(" ");

const child = spawn(process.execPath, [eveBin, ...eveArgs], {
  stdio: "inherit",
  env: {
    ...process.env,
    WORKFLOW_LOCAL_BODY_TIMEOUT_MS:
      process.env.WORKFLOW_LOCAL_BODY_TIMEOUT_MS ?? "180000",
    WORKFLOW_LOCAL_HEADERS_TIMEOUT_MS:
      process.env.WORKFLOW_LOCAL_HEADERS_TIMEOUT_MS ?? "180000",
    NODE_OPTIONS: nodeOptions,
  },
});

child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
