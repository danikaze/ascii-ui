import { Terminal, TerminalOptions } from '../../src/Terminal';
import { Grid, GridOptions } from '../../src/widgets/Grid';

import { load } from '../util/load';

function run(terminal: Terminal): void {
  /* tslint:disable:no-magic-numbers */
  const options: GridOptions = {
    columns: 4,
    rows: 4,
  };

  const grid = new Grid(terminal, options);
  terminal.attachWidget(grid);
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  debug: { verbose: true },
};

load(terminalOptions)
  .then(run);
