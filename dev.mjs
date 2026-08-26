import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const eveBin = fileURLToPath(
  new URL("./node_modules/eve/bin/eve.js", import.meta.url),
);
const warningFlag = "--disable-warning=MaxListenersExceededWarning";
const nodeOptions = process.env.NODE_OPTIONS?.includes(warningFlag)
  ? process.env.NODE_OPTIONS
  : [process.env.NODE_OPTIONS, warningFlag].filter(Boolean).join(" ");

const child = spawn(
  process.execPath,
  [eveBin, "dev", ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      WORKFLOW_LOCAL_BODY_TIMEOUT_MS:
        process.env.WORKFLOW_LOCAL_BODY_TIMEOUT_MS ?? "180000",
      WORKFLOW_LOCAL_HEADERS_TIMEOUT_MS:
        process.env.WORKFLOW_LOCAL_HEADERS_TIMEOUT_MS ?? "180000",
      NODE_OPTIONS: nodeOptions,
    },
  },
);

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
