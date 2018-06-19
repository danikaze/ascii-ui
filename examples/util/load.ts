import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal, TerminalEvent, TerminalOptions } from '@src/Terminal';

interface TestWindow extends Window {
  terminal: Terminal;
}

interface LoadData {
  canvas: HTMLCanvasElement;
  terminal: Terminal;
}

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

function terminalResizedHandler(canvas) {
  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;
}

export function load(terminalOptions: TerminalOptions): Promise<LoadData> {
  const font = new FontFaceObserver('Terminal_VT220');

  return font.load()
    .then(hideLoad)
    .then(() => new Promise((resolve, reject) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const terminal = new Terminal(canvas, terminalOptions);

      terminalResizedHandler(canvas);
      terminal.listen(TerminalEvent.RESIZED, terminalResizedHandler.bind(0, canvas));

      (window as TestWindow).terminal = terminal;
      resolve({ canvas, terminal });
    }));
}
