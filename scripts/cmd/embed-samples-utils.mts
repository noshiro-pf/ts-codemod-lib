const ignoreAboveKeyword = '// embed-sample-code-ignore-above';

const ignoreBelowKeyword = '// embed-sample-code-ignore-below';

/** Extracts the relevant sample code, removing ignore markers */
export const extractSampleCode = (content: string): string => {
  const startIndex = content.indexOf(ignoreAboveKeyword);

  const endIndex = content.indexOf(ignoreBelowKeyword);

  const start = startIndex === -1 ? 0 : startIndex + ignoreAboveKeyword.length;

  const end = endIndex === -1 ? content.length : endIndex;

  return normalizeIndent(
    content.slice(start, end).replaceAll(/IGNORE_EMBEDDING\(.*\);\n/gu, ''),
  ).trim();
};

const normalizeIndent = (source: string): string => {
  const lines = source.split('\n');

  // Get the indentation of a line excluding blank lines
  const indents = lines
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = /^ */u.exec(line);

      return match !== null ? match[0].length : 0;
    });

  if (indents.length === 0) {
    return source;
  }

  const minIndent = Math.min(...indents);

  return lines.map((line) => line.slice(minIndent)).join('\n');
};
