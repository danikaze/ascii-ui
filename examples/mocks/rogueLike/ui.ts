/* tslint:disable:no-magic-numbers */

import { Terminal } from '../../../src/Terminal';
import { Grid, GridOptions } from '../../../src/widgets/Grid';
import { Text, TextOptions } from '../../../src/widgets/Text';

import { drawMap } from './map';
import { drawPj, drawStats, pjStr } from './pj';

export interface Ui {
  grid: Grid;
  stats: Text;
  map: Text;
  info: Text;
  text: Text;
}

export const widgets: Ui = {
  grid: null,
  stats: null,
  map: null,
  info: null,
  text: null,
};

export function createUi(terminal: Terminal): void {
  widgets.grid = terminal.attachWidget(Grid, {
    borders: true,
    fullSize: true,
    columns: 5,
    rows: 10,
  } as GridOptions);

  widgets.stats = widgets.grid.attachWidget(0, 0, 1, 5, Text, { text: 'STR: 10' } as TextOptions);
  widgets.map = widgets.grid.attachWidget(1, 0, 4, 8, Text, { text: '##MAP##', tokenizer: null } as TextOptions);
  widgets.info = widgets.grid.attachWidget(0, 5, 1, 3, Text, { text: `${pjStr} You` } as TextOptions);
  widgets.text = widgets.grid.attachWidget(0, 8, 5, 2, Text, { text: 'Text' } as TextOptions);

  drawMap();
  drawStats();
  drawPj(terminal);
}
