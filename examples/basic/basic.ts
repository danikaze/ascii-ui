/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal } from '../../src/Terminal';

interface TestWindow extends Window {
  terminal: Terminal;
}

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_COMMAND_WIN_LEFT = 91;
const KEY_COMMAND_WIN_RIGHT = 93;
const KEY_ALT = 18;
const KEY_CTRL = 17;
const KEY_CAPS = 20;
const KEY_TAB = 9;
const KEY_ESC = 27;

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

function bindKeys(terminal: Terminal) {
  const directionMap = {
    [KEY_UP]: [0, -1],
    [KEY_DOWN]: [0, 1],
    [KEY_LEFT]: [-1, 0],
    [KEY_RIGHT]: [1, 0],
  };

  document.addEventListener('keydown', (event) => {
    const direction = directionMap[event.keyCode];
    if (direction) {
      terminal.moveCursor(direction[0], direction[1]);
    } else if (event.keyCode === KEY_BACKSPACE) {
      terminal.moveCursor(-1, 0);
      terminal.setText(' ');
      terminal.moveCursor(-1, 0);
    } else if (event.keyCode === KEY_DELETE) {
      terminal.setText(' ');
      terminal.moveCursor(-1, 0);
    } else if (event.keyCode === KEY_ENTER) {
      terminal.setCursor(0, terminal.getCursor().line + 1);
    } else if (event.key.length === 1) {
      terminal.setText(event.key);
    }
  });
}

function bindMouse(terminal: Terminal, canvas: HTMLCanvasElement) {
  canvas.addEventListener('click', (event) => {
    const bounds = canvas.getBoundingClientRect();
    const tile = terminal.getTilePosition(event.x - bounds.left, event.y - bounds.top);
    terminal.setCursor(tile.col, tile.line);
  });
}

function run() {
  /* tslint:disable:no-magic-numbers */
  const columns = 40;
  const lines = 20;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const terminal = new Terminal(canvas, {
    columns,
    lines,
  });

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  terminal.setText('abcdef');
  terminal.setText('foobar', 1, 2);
  terminal.setText('foobar', columns - 2, 3);

  bindKeys(terminal);
  bindMouse(terminal, canvas);
  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
