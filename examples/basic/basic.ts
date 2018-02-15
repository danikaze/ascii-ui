import * as FontFaceObserver from 'fontfaceobserver';
import { Terminal } from '../../src/Terminal';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;

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
    } else {
      terminal.setText(String.fromCharCode(event.which || event.keyCode));
    }
  });
}

function run() {
  const columns = 40;
  const lines = 20;
  const canvas = <HTMLCanvasElement>(document.getElementById('canvas'));
  const terminal = new Terminal(canvas, {
    columns,
    lines,
    debug: true
  });

  terminal.setText('abcdef');
  terminal.setText('foobar', 1, 2);
  terminal.setText('foobar', 38, 2);
  terminal.setTextBlock(['foo', 'bar'], 0, 4);
  terminal.setTextBlock(['foo', 'bar'], 38, 8);

  bindKeys(terminal);
  (<any>window).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
