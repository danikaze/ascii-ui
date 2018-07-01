import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal, TerminalOptions } from '@src/Terminal';
import { TerminalEvent } from '@src/TerminalEvent';

export interface TestWindow extends Window {
  terminal: Terminal;
  TerminalEvent: typeof TerminalEvent;
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

  function enableFocusInteraction(terminal: Terminal, canvas: HTMLCanvasElement): void {
    /*
     * PREV/NEXT buttons
     */
    const buttonPrev = document.getElementById('prev');
    const buttonNext = document.getElementById('next');

    if (buttonPrev) {
      buttonPrev.addEventListener('click', terminal.focusManager.prev.bind(terminal.focusManager));
    }
    if (buttonNext) {
      buttonNext.addEventListener('click', terminal.focusManager.next.bind(terminal.focusManager));
    }

    /*
     * TAB key
     */
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const method = event.shiftKey ? 'prev' : 'next';
        terminal.focusManager[method]();
      }
    });

    /*
     * Mouse CLICK
     */
    canvas.addEventListener('click', (event) => {
      const cell = terminal.getTilePosition(event.offsetX, event.offsetY);
      const widget = terminal.getLeafWidgetAt(cell.col, cell.line);
      terminal.focusManager.focus(widget);
    });
  }

  return font.load()
    .then(hideLoad)
    .then(() => new Promise<LoadData>((resolve, reject) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const terminal = new Terminal(canvas, terminalOptions);
      enableFocusInteraction(terminal, canvas);

      terminalResizedHandler(canvas);
      terminal.eventManager.listen('resized', terminalResizedHandler.bind(0, canvas));

      (window as TestWindow).terminal = terminal;
      (window as TestWindow).TerminalEvent = TerminalEvent;

      resolve({ canvas, terminal });
    }));
}
