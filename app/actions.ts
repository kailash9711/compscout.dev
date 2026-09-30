"use server";

import fs from "fs";
import path from "path";
import * as ts from "typescript";

export async function getComponentCode(name: string) {
  try {
    const filePath = path.join(process.cwd(), "components", `${name}.tsx`);
    const tsxCode = fs.readFileSync(filePath, "utf-8");
    
    const result = ts.transpileModule(tsxCode, {
      compilerOptions: {
        jsx: ts.JsxEmit.Preserve,
        target: ts.ScriptTarget.ESNext,
        removeComments: false,
      }
    });

    return {
      tsx: tsxCode,
      jsx: result.outputText
    };
  } catch (error) {
    console.error(`Failed to read code for component ${name}:`, error);
    const errorMsg = `// Error loading code for ${name}.tsx\n// Make sure the file exists in the components folder.`;
    return { tsx: errorMsg, jsx: errorMsg };
  }
}
