import * as FontFaceObserver from 'fontfaceobserver';

import { FocusManager } from '@src/FocusManager';
import { Terminal, TerminalEvent, TerminalOptions } from '@src/Terminal';

interface TestWindow extends Window {
  terminal: Terminal;
}

interface LoadData {
  canvas: HTMLCanvasElement;
  terminal: Terminal;
  focusManager: FocusManager;
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

  function enableFocusInteraction(terminal: Terminal, focusManager: FocusManager, canvas: HTMLCanvasElement): void {
    /*
     * PREV/NEXT buttons
     */
    const buttonPrev = document.getElementById('prev');
    const buttonNext = document.getElementById('next');

    if (buttonPrev) {
      buttonPrev.addEventListener('click', focusManager.prev.bind(this));
    }
    if (buttonNext) {
      buttonNext.addEventListener('click', focusManager.next.bind(this));
    }

    /*
     * TAB key
     */
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const method = event.shiftKey ? 'prev' : 'next';
        focusManager[method]();
      }
    });

    /*
     * Mouse CLICK
     */
    canvas.addEventListener('click', (event) => {
      const cell = terminal.getTilePosition(event.offsetX, event.offsetY);
      const widget = terminal.getLeafWidgetAt(cell.col, cell.line);
    });
  }

  return font.load()
    .then(hideLoad)
    .then(() => new Promise<LoadData>((resolve, reject) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const terminal = new Terminal(canvas, terminalOptions);
      const focusManager = new FocusManager(terminal, canvas);
      enableFocusInteraction(terminal, focusManager, canvas);

      terminalResizedHandler(canvas);
      terminal.listen(TerminalEvent.RESIZED, terminalResizedHandler.bind(0, canvas));

      (window as TestWindow).terminal = terminal;

      resolve({ canvas, focusManager, terminal });
    }));
}
