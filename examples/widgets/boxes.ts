/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal } from '../../src/Terminal';
import { Box, BoxOptions } from '../../src/widgets/Box';

interface TestWindow extends Window {
  terminal: Terminal;
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
  const terminal = new Terminal(canvas, {
    columns,
    lines,
    cursor: false,
    debug: { verbose: true },
  });

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  const options: BoxOptions = {
    col: 1,
    line: 1,
    width: 20,
    height: 5,
  };
  //const b1 = new Box(terminal, options);
  const b1 = terminal.attachWidget(Box, options);

  options.line = 7;
  options.title = 'Title';
  // const b2 = new Box(terminal, options);
  const b2 = terminal.attachWidget(Box, options);

  options.line = 13;
  options.title = 'Very long title for real';
  // const b3 = new Box(terminal, options);
  const b3 = terminal.attachWidget(Box, options);

  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);
