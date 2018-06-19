/* tslint:disable:no-magic-numbers */
import { Terminal, TerminalOptions } from '@src/Terminal';
import { Box } from '@src/widgets/Box';
import { Grid, GridOptions } from '@src/widgets/Grid';
import { Text } from '@src/widgets/Text';

import { load } from '../util/load';

import '../styles/examples.less';

function resizeTerminal(terminal: Terminal, w: number, h: number) {
  const currentSize = terminal.getSize();
  terminal.setOptions({
    rows: currentSize.rows + h,
    columns: currentSize.columns + w,
  });
}

function enableControls(terminal: Terminal, canvas: HTMLCanvasElement) {
  document.getElementById('left')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, -1, 0));
  document.getElementById('right')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, +1, 0));
  document.getElementById('up')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, -1));
  document.getElementById('down')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, 1));
}

function run({ terminal, canvas }): void {
  const options: GridOptions = {
    columns: 4,
    rows: 4,
  };
  const zeroPadding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const grid = terminal.attachWidget(Grid, options);
  enableControls(terminal, canvas);

  grid.attachWidget(0, 0, 1, 1, Box, { title: '(1x1)', padding: zeroPadding })
      .attachWidget(Text, { text: 'Text A'});
  grid.attachWidget(1, 0, 2, 1, Box, { title: '(2x1)', padding: zeroPadding })
      .attachWidget(Text, { text: 'Text B'});
  grid.attachWidget(3, 0, 1, 3, Box, { title: '(1x3)', padding: zeroPadding })
      .attachWidget(Text, { text: 'Text C'});
  const internalGridBox = grid.attachWidget(0, 1, 2, 3, Box, { title: 'Grid', padding: zeroPadding });
  const widgetToDelete = grid.attachWidget(2, 2, 1, 1, Box, { title: '(1x1)', padding: zeroPadding });
  grid.attachWidget(2, 3, 2, 1, Box, { title: '(2x1)', padding: zeroPadding })
      .attachWidget(Text, { text: 'Text D'});
  grid.dettachWidget(widgetToDelete);

  const internalGrid = internalGridBox.attachWidget(Grid, { columns: 1, rows: 3 });
  internalGrid.attachWidget(0, 0, 1, 1, Box, { title: '(X)', padding: zeroPadding })
    .attachWidget(Text, { text: 'Text X' });
  internalGrid.attachWidget(0, 1, 1, 1, Box, { title: '(Y)', padding: zeroPadding })
    .attachWidget(Text, { text: 'Text Y' });
  internalGrid.attachWidget(0, 2, 1, 1, Box, { title: '(Z)', padding: zeroPadding })
    .attachWidget(Text, { text: 'Text Z' });
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  debug: { verbose: true },
};

load(terminalOptions)
  .then(run);
