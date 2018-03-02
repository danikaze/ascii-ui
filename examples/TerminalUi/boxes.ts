/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { TerminalUiBox } from '../../src/TerminalUi/TerminalUi';

interface TestWindow extends Window {
  terminal: TerminalUiBox;
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
  const terminal = new TerminalUiBox(canvas, {
    columns,
    lines,
    cursor: false,
    debug: { verbose: true },
  });

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  terminal.drawBox(1, 1, 20, 4);
  terminal.drawBox(1, 6, 20, 4, 'Title');
  terminal.drawBox(1, 11, 20, 4, 'Very long title for real');

  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
