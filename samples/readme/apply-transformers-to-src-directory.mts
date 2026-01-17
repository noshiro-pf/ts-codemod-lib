/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing, security/detect-non-literal-fs-filename, @stylistic/padding-line-between-statements */
// embed-sample-code-ignore-above
import { glob } from 'glob';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import * as prettier from 'prettier';
import {
  appendAsConstTransformer,
  convertInterfaceToTypeTransformer,
  convertToReadonlyTypeTransformer,
  replaceAnyWithUnknownTransformer,
  replaceRecordWithUnknownRecordTransformer,
  transformSourceCode,
} from 'ts-codemod-lib';

const thisScriptDir = import.meta.dirname;

const srcDir = path.resolve(thisScriptDir, './path/to/src');

const srcFileList = await glob(`${srcDir}/**/*.mts`);

const srcFileListFiltered = srcFileList.filter(
  (s) =>
    // Ignore files by specifying a regular expression, listing them in a Set, etc.
    !s.endsWith('.d.mts'),
);

console.log('srcDir', srcDir);
console.log('target files: ', srcFileList);

await Promise.all(
  srcFileListFiltered.map(async (filePath) => {
    const content = await fs.readFile(filePath, { encoding: 'utf8' });

    const options = await prettier.resolveConfig(filePath);

    const isTsx = filePath.endsWith('.tsx') || filePath.endsWith('.jsx');

    const contentTransformed = transformSourceCode(content, isTsx, [
      convertInterfaceToTypeTransformer(),
      replaceRecordWithUnknownRecordTransformer(),
      convertToReadonlyTypeTransformer(),
      appendAsConstTransformer(),
      replaceAnyWithUnknownTransformer(),
    ]);

    const contentFormatted = await prettier.format(contentTransformed, {
      ...options,
      filepath: filePath,
    });

    await fs.writeFile(filePath, contentFormatted);

    console.log(
      `${filePath} converted. ${content === contentFormatted ? '(unchanged)' : '(changed)'}`,
    );
  }),
);
