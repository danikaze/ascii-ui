import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal, TerminalOptions } from '../../src/Terminal';
import { TerminalEvent } from '../../src/TerminalEvent';

export interface TestWindow extends Window {
  terminal: Terminal;
  TerminalEvent: typeof TerminalEvent;
}

export interface LoadData {
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

export function load(terminalOptions?: TerminalOptions): Promise<LoadData> {
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
    function tabWidget(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        const method = event.shiftKey ? 'prev' : 'next';
        terminal.focusManager[method]();
      }
    }
    document.addEventListener('click', () => {
      document.removeEventListener('keydown', tabWidget);
    });
    document.getElementById('canvasContainer')
    .addEventListener('click', (event) => {
        event.stopPropagation();
        document.addEventListener('keydown', tabWidget);
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

  function resizeTerminal(terminal: Terminal, w: number, h: number) {
    const currentSize = terminal.getSize();
    terminal.setOptions({
      rows: currentSize.rows + h,
      columns: currentSize.columns + w,
    });
  }

  function enableResizeButtons(terminal: Terminal, canvas: HTMLCanvasElement) {
    document.getElementById('left')
      .addEventListener('click', resizeTerminal.bind(undefined, terminal, -1, 0));
    document.getElementById('right')
      .addEventListener('click', resizeTerminal.bind(undefined, terminal, +1, 0));
    document.getElementById('up')
      .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, -1));
    document.getElementById('down')
      .addEventListener('click', resizeTerminal.bind(undefined, terminal, 0, 1));
  }

  return font.load()
    .then(hideLoad)
    .then(() => new Promise<LoadData>((resolve, reject) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const defaultTerminalOptions: TerminalOptions = {
        columns: 40,
        rows: 20,
        cursor: false,
      };
      const terminal = new Terminal(canvas, { ...defaultTerminalOptions, ...terminalOptions });
      enableFocusInteraction(terminal, canvas);
      enableResizeButtons(terminal, canvas);

      terminalResizedHandler(canvas);
      terminal.eventManager.addListener('resized', terminalResizedHandler.bind(0, canvas));

      (window as TestWindow).terminal = terminal;
      (window as TestWindow).TerminalEvent = TerminalEvent;

      resolve({ canvas, terminal });
    }));
}
