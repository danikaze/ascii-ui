/* tslint:disable:no-magic-numbers */
import { Terminal, TerminalOptions } from '@src/Terminal';
import { Box } from '@src/widgets/Box';
import { Select, SelectOptions } from '@src/widgets/Select';

import { load } from '../util/load';

function enableInteraction(selects: Array<Select<number>>, terminal: Terminal, canvas: HTMLCanvasElement): void {
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
      selects.forEach((select) => {
        if (select.isFocused()) {
          select.prev();
        }
      });
    } else if (event.key === 'ArrowDown') {
      selects.forEach((select) => {
        if (select.isFocused()) {
          select.next();
        }
      });
    }
  });

  canvas.addEventListener('click', (event) => {
    const cell = terminal.getTilePosition(event.offsetX, event.offsetY);
    const widget = terminal.getLeafWidgetAt(cell.col, cell.line);
    if (widget instanceof Select) {
      const option = widget.getOptionAt(cell.col, cell.line);
      widget.selectOption(option);
    }
  });
}

function run({ terminal, canvas }): void {
  const zeroPadding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  const boxOptions = {
    width: 22,
    height: 5,
    padding: zeroPadding,
  };

  const s1: Select<number> = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[Select-A]',
    col: 1,
    line: 1,
  })
  .attachWidget(Select, {
    options: [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2 (disabled)', value: 2, disabled: true },
      { text: 'Option 3', value: 3 },
    ],
  });

  const s2: Select<number> = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[Select-B]',
    col: 1,
    line: 7,
  })
  .attachWidget(Select, {
    options: [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2 takes two lines', value: 2 },
      { text: 'Option 3 is very very long and takes three lines', value: 3 },
      { text: 'Option 4', value: 4 },
    ],
  });

  const s3: Select<number> = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[Select-C]',
    col: 1,
    line: 13,
    width: 30,
    height: 7,
  })
  .attachWidget(Select, {
    selectedIndex: 0,
    options: [
      { text: 'Option 1 (default)', value: 1 },
      { text: 'Option 2', value: 2 },
      { text: 'Option 3', value: 3 },
    ],
  });

  enableInteraction([s1, s2, s3], terminal, canvas);
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  debug: { verbose: true },
};

load(terminalOptions)
  .then(run);
