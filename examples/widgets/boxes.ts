/* tslint:disable:no-magic-numbers */
/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal } from '@src/Terminal';
import { Box, BoxOptions } from '@src/widgets/Box';
import { Text, TextOptions } from '@src/widgets/Text';

import { load } from '../util/load';

import '../styles/examples.less';

interface TestWindow extends Window {
  terminal: Terminal;
}

function scrollText(texts: Text[]) {
  document.addEventListener('keydown', (event) => {
    texts.forEach((text) => {
      if (text.isFocused()) {
        switch (event.key) {
          case 'ArrowDown':
            text.scrollLines(1);
            break;
          case 'ArrowUp':
            text.scrollLines(-1);
            break;
          case 'PageUp':
            text.scrollPages(-1);
            break;
          case 'PageDown':
            text.scrollPages(1);
            break;
          default:
        }
      }
    });
  });
}

function run({ terminal, canvas }) {
  /* tslint:disable:no-magic-numbers */
  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  const options: BoxOptions = {
    col: 1,
    line: 1,
    width: 20,
    height: 5,
  };
  const box1 = terminal.attachWidget(Box, options);

  options.line = 7;
  options.title = 'Title';
  const box2 = terminal.attachWidget(Box, options) as Box;
  const text1 = box2.attachWidget(Text, { text: '1 tile margin', textStyle: { fg: '#ffff00' } }) as Text;

  options.line = 13;
  options.title = 'Very long title for real';
  options.padding = { top: 0, bottom: 0, right: 0, left: 0};
  const box3 = terminal.attachWidget(Box, options) as Box;
  const text2 = box3.attachWidget(Text, {
    typewritterDelay: 50,
    text: ''
    //  |--------------------| // box size
      + 'This is a long '
      + 'text inside a box '
      + 'with no margins '
      + 'but it doesn\'t fit '
      + 'it all. However, '
      + 'it continues for '
      + 'several lines like '
      + 'this variable is '
      + 'defined.',
    //  |--------------------| // box size
  }) as Text;
  scrollText([text1, text2]);

  options.line = 1;
  options.col = 23;
  options.width = 15;
  options.height = 3;
  options.title = 'no-wrap';
  const box4 = terminal.attachWidget(Box, options) as Box;
  box4.attachWidget(Text, { text: 'this text should be not shown entirely', tokenizer: false });

  options.line = 5;
  options.title = 'no-ellipsis';
  const box5 = terminal.attachWidget(Box, options) as Box;
  box5.attachWidget(Text, { text: 'this text should be not shown entirely', tokenizer: false, ellipsis: '' });

  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
const terminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
};

load(terminalOptions)
  .then(run);
