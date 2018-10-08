import { EscapeCommandParams, TerminalOptions } from '../../../src/Terminal';
import { LoadData } from '../../util/load';

import { bindKeys } from './input';

const COLORS = [
  '#00ff00',
  '#ffff00',
  'red',
  'purple',
];

const commands = {
  '\\c': setColor,
};

function setColor({ terminal, text, index }: EscapeCommandParams): number {
  const ESCAPE_TXT_LENGTH = 2;
  const COLOR_TXT_LENGTH = 1;
  const colorIndex = Number(text.substr(index + ESCAPE_TXT_LENGTH, COLOR_TXT_LENGTH));
  const color = COLORS[colorIndex];

  if (color) {
    terminal.setOptions({ fg: color });
  }

  return index + ESCAPE_TXT_LENGTH + COLOR_TXT_LENGTH;
}

export const terminalOptions: TerminalOptions = {
  commands,
  rows: 20,
  columns: 40,
};

export function terminalConfig({ terminal, canvas }: LoadData): void {
  bindKeys(terminal);
}
