import { Terminal } from '../../../src/Terminal';

import { isValidPosition } from './map';
import { widgets } from './ui';

export const pjStr = '\\c1@\\c0';

const pj = {
  pos: {
    x: 10,
    y: 11,
  },
  stats: {
    str: 10,
    int: 12,
    agi: 8,
    dex: 9,
  },
};

export function drawPj(terminal: Terminal, str: string = pjStr): void {
  const pos = widgets.map.getPosition();
  terminal.setText(str, pj.pos.x + pos.col, pj.pos.y + pos.line);
}

export function drawStats(): void {
  const text = `STR: ${pj.stats.str}\n`
             + `INT: ${pj.stats.int}\n`
             + `AGI: ${pj.stats.agi}\n`
             + `DEX: ${pj.stats.dex}\n`;

  widgets.stats.setOptions({ text });
}

export function move(dx: number, dy: number, terminal: Terminal): void {
  const newX = pj.pos.x + dx;
  const newY = pj.pos.y + dy;

  if (isValidPosition(newX, newY)) {
    drawPj(terminal, ' ');
    pj.pos.x = newX;
    pj.pos.y = newY;
    drawPj(terminal);
  }
}
