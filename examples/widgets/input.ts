/* tslint:disable:no-magic-numbers */
import { TerminalOptions } from '@src/Terminal';
import { Box } from '@src/widgets/Box';
import { Input } from '@src/widgets/Input';

import { load } from '../util/load';

function enableInteraction(inputs: Input[]): void {
  document.addEventListener('keyup', (event) => {
    if (event.key.length === 1) {
      inputs.forEach((input) => {
        if (input.isFocused()) {
          const value = input.getValue();
          input.setValue(value + event.key);
        }
      });
    } else if (event.key === 'Backspace') {
      inputs.forEach((input) => {
        if (input.isFocused()) {
          const value = input.getValue();
          input.setValue(value.substr(0, value.length - 1));
        }
      });
    }
  });
}

function run({ terminal }): void {
  const zeroPadding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const i1 = terminal.attachWidget(Box, { col: 0, line: 0, width: 12, height: 3, title: '[A]', padding: zeroPadding })
    .attachWidget(Input, { width: 10 });

  const i2 = terminal.attachWidget(Box, { col: 0, line: 4, width: 7, height: 3, title: '[B]', padding: zeroPadding })
    .attachWidget(Input, { width: 5, maxLength: 3 });

  const i3 = terminal.attachWidget(Box, { col: 0, line: 8, width: 12, height: 3, title: '[C]', padding: zeroPadding })
    .attachWidget(Input, { width: 10, maxLength: 10, password: true });

  enableInteraction([i1, i2, i3]);
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  verbose: true,
};

load(terminalOptions)
  .then(run);
