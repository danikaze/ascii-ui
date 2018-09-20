/* tslint:disable:no-magic-numbers */
import { Grid, GridOptions } from '../../src/widgets/Grid';
import { Text } from '../../src/widgets/Text';
import { load, LoadData } from '../util/load';

function run({ terminal }: LoadData): void {
  const options: GridOptions = {
    columns: 4,
    rows: 4,
    borders: true,
  };

  const grid = terminal.attachWidget(Grid, options);

  grid.attachWidget(0, 0, 1, 1, Text, { text: 'A' });
  grid.attachWidget(1, 1, 1, 1, Text, { text: 'B' });
  grid.attachWidget(0, 1, 1, 2, Text, { text: 'C' });
  grid.attachWidget(1, 0, 2, 1, Text, { text: 'D' });
  grid.attachWidget(0, 1, 1, 2, Text, { text: 'E' });
  grid.attachWidget(1, 0, 2, 1, Text, { text: 'F' });
  grid.attachWidget(2, 1, 2, 2, Text, { text: 'G' });
  grid.attachWidget(3, 0, 1, 1, Text, { text: 'H' });
  grid.attachWidget(0, 3, 1, 1, Text, { text: 'I' });
  grid.attachWidget(1, 2, 1, 2, Text, { text: 'J' });
  grid.attachWidget(2, 3, 2, 1, Text, { text: 'K' });
}

load()
  .then(run);
