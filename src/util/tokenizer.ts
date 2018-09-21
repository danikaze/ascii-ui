export interface TextToken {
  /** Matched text. It shouldn't contain non-renderizable characters */
  text: string;
  /** If the matched text is a separator or not. It should alternate between true/false */
  isSeparator: boolean;
  /** Index of the string where it starts */
  index: number;
}

export type TokenizerFunction = (text: string) => TextToken[];

/**
 * Given a text, it will split it into words
 *
 * @param text Text to split
 * @return text splitted into tokens
 */
export function tokenizer(text: string): TextToken[] {
  const re = /(\s+)|(\S+)/g;
  const res = [];
  let match = re.exec(text);

  while (match) {
    res.push({
      isSeparator: match[1] !== undefined,
      text: match[0],
      index: match.index,
    });
    match = re.exec(text);
  }

  return res;
}

/**
 * Splits a text into different lines given a limit width
 *
 * @param text Text to split
 * @param lineWidth Width of the line to calculate the number of words per line
 * @param tknzr Function to use to split the text into words
 * @return Splitted text for each line
 */
export function splitText(text: string, lineWidth: number, tknzr: TokenizerFunction = tokenizer): string[] {
  const res: string[] = [];
  const tokenizedText = tknzr(text);
  let line = '';

  tokenizedText.forEach((token) => {
    if (!token || (line.length === 0 && token.isSeparator)) {
      return;
    }

    if (line.length + token.text.length <= lineWidth) {
      line += token.text;
    } else {
      if (line.length > 0) {
        res.push(line + ' '.repeat(lineWidth - line.length));
      }
      if (token.isSeparator) {
        line = '';
      } else {
        while (token.text.length > lineWidth) {
          res.push(token.text.substr(0, lineWidth));
          token.text = token.text.substr(lineWidth);
          token.index += lineWidth;
        }
        line = token.text;
      }
    }
  });

  if (line.length > 0) {
    res.push(line + ' '.repeat(lineWidth - line.length));
  }

  return res;
}

/**
 * Limit a text to a length, and add a ellipsis character if needed (and specified)
 *
 * @param text string to limit
 * @param lineWidth maximum length of the text
 * @param ellipsis string to add in the end if the text is too long
 */
export function noWrap(text: string, lineWidth: number, ellipsis: string = ''): string {
  if (text && text.length > lineWidth) {
    return (`${text.substr(0, lineWidth - ellipsis.length)}${ellipsis}`).substr(0, lineWidth);
  }

  return text;
}
