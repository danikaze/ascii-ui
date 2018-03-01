/* tslint:disable:typedef */
import { Terminal } from '../Terminal';

import { boxBorderCharacters } from './defaultValues';

export interface BoxBorderCharacters {
  topLeft: string;
  top: string;
  topRight: string;
  left: string;
  right: string;
  bottomLeft: string;
  bottom: string;
  bottomRight: string;
}

export class TerminalUi extends Terminal {
  boxBorders: BoxBorderCharacters = boxBorderCharacters;

  box(col: number, line: number, width: number, height: number, title?: string): void {
    const boxBorders = this.boxBorders;
    const titleMaxLength = width - 3; // 3 = 1 of each corner + 1 margin to the left of the title
    const ellipsis = '...';

    if (title && title.length > titleMaxLength) {
      title = `${title.substr(0, titleMaxLength - ellipsis.length)}${ellipsis}`;
    }

    const lastLine = line + height ;
    const lastCol = col + width - 1;
    const autoRender = this.options.autoRender;
    const cursor = this.options.cursor;
    const cursorPosition = this.getCursor();

    this.setOptions({
      autoRender: false,
      cursor: false,
    });

    // top
    const top = title
    ? `${boxBorders.topLeft}${boxBorders.top}${title}`
      + `${boxBorders.top.repeat(titleMaxLength - title.length)}${boxBorders.topRight}`
    : `${boxBorders.topLeft}${boxBorders.top.repeat(titleMaxLength + 1)}${boxBorders.topRight}`;
    this.setText(top, col, line);

    // left
    for (let i = line + 1; i < lastLine; i++) {
      this.setText(boxBorders.left, col, i);
    }

    // right
    for (let i = line + 1; i < lastLine; i++) {
      this.setText(boxBorders.left, lastCol, i);
    }

    // bottom
    const bottom = `${boxBorders.bottomLeft}${boxBorders.bottom.repeat(titleMaxLength + 1)}${boxBorders.bottomRight}`;
    this.setText(bottom, col, line + height);

    this.setCursor(cursorPosition.col, cursorPosition.line);
    if (autoRender) {
      this.render();
    }
    this.setOptions({
      autoRender,
      cursor,
    });
  }
}

export default TerminalUi;
