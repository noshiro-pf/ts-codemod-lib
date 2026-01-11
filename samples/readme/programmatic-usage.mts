/* eslint-disable security/detect-non-literal-fs-filename */
// embed-sample-code-ignore-above
import * as fs from 'node:fs/promises';
import {
  convertInterfaceToTypeTransformer,
  convertToReadonlyTypeTransformer,
  replaceRecordWithUnknownRecordTransformer,
  transformSourceCode,
} from 'ts-codemod-lib';

for await (const filePath of fs.glob('test/**/*.{mts,tsx}')) {
  console.log(`Processing file: ${filePath}`);

  const originalCode = await fs.readFile(filePath, 'utf8');

  const isTsx = filePath.endsWith('.tsx') || filePath.endsWith('.jsx');

  // Apply transformations to source code
  const transformedCode = transformSourceCode(originalCode, isTsx, [
    convertInterfaceToTypeTransformer(),
    replaceRecordWithUnknownRecordTransformer(),
    convertToReadonlyTypeTransformer(),
  ]);

  await fs.writeFile(filePath, transformedCode, 'utf8');
}
