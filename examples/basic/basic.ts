/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal } from '@src/Terminal';

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

function setColor(terminal: Terminal, text: string, index: number): number {
  const ESCAPE_TXT_LENGTH = 2;
  const COLOR_TXT_LENGTH = 7;
  const color = text.substr(index + ESCAPE_TXT_LENGTH, COLOR_TXT_LENGTH);
  terminal.setOptions({ fg: color });

  return index + ESCAPE_TXT_LENGTH + COLOR_TXT_LENGTH;
}

function injectText(terminal: Terminal, text: string, index: number) {
  const ESCAPED_TEXT_LENGTH = 3;
  terminal.setText('injected text');

  return index + ESCAPED_TEXT_LENGTH;
}

function run() {
  /* tslint:disable:no-magic-numbers */
  const columns = 40;
  const rows = 20;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const terminal = new Terminal(canvas, {
    columns,
    rows,
    verbose: true,
  });

  const commands = {
    '\\c': setColor.bind(undefined, terminal),
    ':x:': injectText.bind(undefined, terminal),
  };

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  terminal.setText('abcdef');
  terminal.setText('foobar', 1, 2);
  terminal.setText('line overflow', columns - 3, 3);

  terminal.setOptions({ commands });

  terminal.setCursor(1, 6);
  terminal.setText('[\\c#ff00ffmagenta \\c#00ffffcyan \\c#ffff00yellow\\c#00ff00]');
  terminal.setText('[\\c#ffffffwhite \\c#ff0000red\\c#00ff00]', 3, 8);
  terminal.setText('>:x:<', 2, 10);

  bindKeys(terminal);
  bindMouse(terminal, canvas);
  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
