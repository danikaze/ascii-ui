import * as FontFaceObserver from 'fontfaceobserver';

import { CommandAction, CommandParams, Terminal } from '../../src/Terminal';

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
const imgs: HTMLImageElement[] = [];

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

function loadImages() {
  return new Promise((resolve, reject) => {
    const srcs = [
      '../assets/emoji-happy.png',
      '../assets/emoji-sad.png',
    ];
    let pending = srcs.length;
    srcs.forEach((src) => {
      const img = new Image();
      imgs.push(img);
      img.onload = () => {
        pending--;
        if (pending === 0) {
          resolve();
        }
      };
      img.src = src;
    });
  });
}

function bindKeys(terminal: Terminal) {
  const directionMap: { [k: number]: [number, number] } = {
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

function setColor({ text, index }: CommandParams): CommandAction | number {
  const ESCAPE_TXT_LENGTH = 2;
  const COLOR_TXT_LENGTH = 7;
  const color = text.substr(index + ESCAPE_TXT_LENGTH, COLOR_TXT_LENGTH);

  // if the color is not a valid rgb value, ignore this command
  if (!/#[0-9a-f]{6}/i.test(color)) {
    return 0;
  }

  return {
    consumedCharacters: ESCAPE_TXT_LENGTH + COLOR_TXT_LENGTH,
    style: { fg: color },
  };
}

function injectText(): CommandAction {
  const ESCAPED_TEXT_LENGTH = 3;

  return {
    consumedCharacters: ESCAPED_TEXT_LENGTH,
    text: 'injected text',
  };
}

function drawSprite({ match }: CommandParams): CommandAction | number {
  const imgMap: { [k: string]: HTMLImageElement } = {
    ':happy:': imgs[0],
    ':sad:': imgs[1],
  };
  const img = imgMap[match];

  return img ? {
    consumedCharacters: match.length,
    image: {
      img,
      offset: { x: 0, y: 4 },
      size: { width: 18, height: 18 },
    },
  } as CommandAction : match.length;
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
    '\\c': setColor,
    ':x:': injectText,
    ':happy:': drawSprite,
    ':sad:': drawSprite,
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
  terminal.setText('[:happy:]', 2, 12);
  terminal.setText('[:sad:]', 2, 13);

  bindKeys(terminal);
  bindMouse(terminal, canvas);
  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(loadImages)
  .then(hideLoad)
  .then(run);
