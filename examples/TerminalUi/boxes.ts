/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { TerminalUi } from '../../src/TerminalUi/TerminalUi';

interface TestWindow extends Window {
  terminal: TerminalUi;
}

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

function run() {
  /* tslint:disable:no-magic-numbers */
  const columns = 40;
  const lines = 20;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const terminal = new TerminalUi(canvas, {
    columns,
    lines,
    cursor: false,
    debug: { verbose: true },
  });

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  terminal.box(1, 1, 20, 3);
  terminal.box(1, 5, 20, 3, 'Title');
  terminal.box(1, 9, 20, 3, 'Very long title for real');

  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
