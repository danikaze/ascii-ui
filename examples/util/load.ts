import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal, TerminalOptions } from '../../src/Terminal';

interface TestWindow extends Window {
  terminal: Terminal;
}

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

export function load(terminalOptions: TerminalOptions): Promise<Terminal> {
  const font = new FontFaceObserver('Terminal_VT220');

  return font.load()
    .then(hideLoad)
    .then(() => new Promise((resolve, reject) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const terminal = new Terminal(canvas, terminalOptions);
      canvas.parentElement.style.width = `${canvas.width}px`;
      canvas.parentElement.style.height = `${canvas.height}px`;

      (window as TestWindow).terminal = terminal;
      resolve(terminal);
    }));
}
