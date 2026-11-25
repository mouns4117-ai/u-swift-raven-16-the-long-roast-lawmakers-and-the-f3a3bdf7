import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The senator who authored the 214-page AI Accountability Act has spent six weeks trying to convert it to PDF, and his office now distributes the bill as fourteen screenshots taped together.";

// Fail fast: the gate needs one sentence of 1-320 chars, not only whitespace.
if (!LINE.trim() || LINE.length < 1 || LINE.length > 320) {
  throw new Error(`entry line must be 1-320 chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().split(".").filter(Boolean).length > 1) {
  throw new Error("entry must be a single sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
