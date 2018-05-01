import { Terminal, TerminalOptions } from '@src/Terminal';
import { Box } from '@src/widgets/Box';
import { Grid, GridOptions } from '@src/widgets/Grid';

import { load } from '../util/load';

import '../styles/examples.less';

function resizeTerminal(terminal: Terminal, w: number, h: number) {
  const currentSize = terminal.getSize();
  terminal.setOptions({
    rows: currentSize.rows + h,
    columns: currentSize.columns + w,
  });
}

function enableControls(terminal: Terminal) {
  document.getElementById('left')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, -1, 0));
  document.getElementById('right')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, +1, 0));
  document.getElementById('up')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, -1));
  document.getElementById('down')
    .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, 1));
}

function run(terminal: Terminal): void {
  /* tslint:disable:no-magic-numbers */
  const options: GridOptions = {
    columns: 4,
    rows: 4,
  };

  const grid = new Grid(terminal, options);
  terminal.attachWidget(grid);
  enableControls(terminal);

  // grid.attachWidget(0, 0, 2, 1, Box, { title: 'A' });
  // grid.attachWidget(2, 0, 1, 2, Box, { title: 'B' });
  // grid.attachWidget(1, 2, 2, 1, Box, { title: 'C' });
  // grid.attachWidget(0, 1, 1, 2, Box, { title: 'D' });

  grid.attachWidget(0, 0, 1, 1, Box, { title: '(1x1)' });
  grid.attachWidget(1, 0, 2, 1, Box, { title: '(2x1)' });
  grid.attachWidget(3, 0, 1, 3, Box, { title: '(1x3)' });
  grid.attachWidget(0, 1, 3, 1, Box, { title: '(3x1)' });
  grid.attachWidget(0, 2, 2, 2, Box, { title: '(2x2)' });
  const id = grid.attachWidget(2, 2, 1, 1, Box, { title: '(1x1)' });
  grid.attachWidget(2, 3, 2, 1, Box, { title: '(2x1)' });
  grid.dettachWidget(id);
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  debug: { verbose: true },
};

load(terminalOptions)
  .then(run);
