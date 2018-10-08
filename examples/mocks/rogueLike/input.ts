import { Terminal } from '../../../src/Terminal';

import { move } from './pj';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const directionMap: { [k: number]: [number, number] } = {
  [KEY_UP]: [0, -1],
  [KEY_DOWN]: [0, 1],
  [KEY_LEFT]: [-1, 0],
  [KEY_RIGHT]: [1, 0],
};

export function bindKeys(terminal: Terminal) {
  document.addEventListener('keydown', (event) => {
    const direction = directionMap[event.keyCode];
    if (direction) {
      move(direction[0], direction[1], terminal);
    }
  });
}
