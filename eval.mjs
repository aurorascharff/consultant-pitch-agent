import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const localUrl = process.env.EVE_EVAL_URL ?? "http://127.0.0.1:2000/";
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

const eveArgs = ["eval", ...args];

if (!hasExplicitUrl && !args.includes("--list") && (await isReachable(localUrl))) {
  console.log(`Using the running eve server at ${localUrl}`);
  eveArgs.push("--url", localUrl);
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
