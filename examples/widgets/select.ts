/* tslint:disable:no-magic-numbers */
import { Terminal } from '../../src/Terminal';
import { Box } from '../../src/widgets/Box';
import { Select, SelectOptions } from '../../src/widgets/Select';

import { load, LoadData } from '../util/load';

function enableInteraction(selects: Array<Select<number>>, terminal: Terminal, canvas: HTMLCanvasElement): void {
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
      selects.forEach((select) => {
        if (select.isFocused()) {
          select.focusPrev();
        }
      });
    } else if (event.key === 'ArrowDown') {
      selects.forEach((select) => {
        if (select.isFocused()) {
          select.focusNext();
        }
      });
    } else if (event.key === ' ') {
      selects.forEach((select) => {
        if (select.isFocused()) {
          select.toggleIndex(select.getFocusedIndex());
        }
      });
    }
  });

  canvas.addEventListener('click', (event) => {
    const cell = terminal.getTilePosition(event.offsetX, event.offsetY);
    const widget = terminal.getLeafWidgetAt(cell.col, cell.line);
    if (widget instanceof Select) {
      widget.focusIndex(widget.getIndexAt(cell.col, cell.line));
    }
  });
}

function run({ terminal, canvas }: LoadData): void {
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

  const s1 = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[S1] no loop',
    col: 1,
    line: 1,
    loop: false,
  })
  .attachWidget<Select<number>>(Select, {
    options: [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2 (disabled)', value: 2, disabled: true },
      { text: 'Option 3', value: 3 },
    ],
  } as SelectOptions<number>);

  const s2 = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[S2] custom styles',
    col: 1,
    line: 7,
  })
  .attachWidget<Select<number>>(Select, {
    baseStyle: { fg: '#9999ff', bg: '#000000', prefix: '  ' },
    baseFocusedStyle: { fg: '#ddddff', bg: '#000000', prefix: '> ' },
    selectedStyle: { fg: '#9999ff', bg: '#000033', prefix: ' [', suffix: ']' },
    selectedFocusedStyle: { fg: '#ddddff', bg: '#000033', prefix: '>[', suffix: ']' },
    disabledStyle: { fg: '#000099', bg: '#0000ff', prefix: '  ' },
    disabledSelectedStyle: { fg: '#000000', bg: '#000033', prefix: '> ' },
    options: [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2 takes two lines', value: 2 },
      { text: 'Option 3 is very very long and actually takes FOUR lines', value: 3 },
      { text: 'Option 4', value: 4 },
      { text: 'Option 5 takes two lines', value: 5 },
    ],
  } as SelectOptions<number>);

  const s3 = terminal.attachWidget(Box, {
    ...boxOptions,
    title: '[S3] multiple selection',
    col: 1,
    line: 13,
    width: 27,
    height: 7,
  })
  .attachWidget<Select<number>>(Select, {
    multiple: true,
    baseStyle: { prefix: '[ ] ' },
    baseFocusedStyle: { prefix: '[ ] ' },
    selectedStyle: { prefix: '[x] ' },
    selectedFocusedStyle: { prefix: '[x] ' },
    disabledStyle: { prefix: '[ ] ' },
    disabledSelectedStyle: { prefix: '[x] ' },
    options: [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2', value: 2 },
      { text: 'Option 3', value: 3 },
      { text: 'Option 4', value: 4 },
    ],
  } as SelectOptions<number>);

  enableInteraction([s1, s2, s3], terminal, canvas);
}

load()
  .then(run);
