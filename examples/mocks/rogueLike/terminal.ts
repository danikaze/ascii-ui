import { CommandAction, CommandParams, TerminalOptions } from '../../../src/Terminal';
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

function setColor({ text, index }: CommandParams): CommandAction {
  const ESCAPE_TXT_LENGTH = 2;
  const COLOR_TXT_LENGTH = 1;

  const colorIndex = Number(text.substr(index + ESCAPE_TXT_LENGTH, COLOR_TXT_LENGTH));
  const color = COLORS[colorIndex];
  const action: CommandAction = {
    consumedCharacters: ESCAPE_TXT_LENGTH + COLOR_TXT_LENGTH,
  };

  if (color) {
    action.style = { fg: color };
  }

  return action;
}

export const terminalOptions: TerminalOptions = {
  commands,
  rows: 20,
  columns: 40,
};

export function terminalConfig({ terminal, canvas }: LoadData): void {
  bindKeys(terminal);
}
