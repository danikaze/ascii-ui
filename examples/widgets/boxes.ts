/* tslint:disable:no-magic-numbers */
/* tslint:disable:typedef */
import { Terminal } from '../../src/Terminal';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Text, TextOptions } from '../../src/widgets/Text';

import { load } from '../util/load';

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

function autoSkipText(texts: Text[], size: number) {
  const DELAY = 200;
  const PAUSE = 1000;

  texts.forEach((text) => {
    const maxSkip = text.getTextSize().columns - size;
    let skip = 0;
    let direction = 1;

    function updateSkip() {
      skip += direction;
      const end = skip === maxSkip || skip === 0;
      const options: TextOptions = { skip };
      text.setOptions(options);

      if (end) {
        direction *= -1;
      }

      setTimeout(updateSkip, end ? PAUSE : DELAY);
    }

    setTimeout(updateSkip, PAUSE);
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
  terminal.attachWidget(Box, options);

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

  options.line = 1;
  options.col = 23;
  options.width = 15;
  options.height = 3;
  options.title = 'no-wrap';
  const box4 = terminal.attachWidget(Box, options) as Box;
  box4.attachWidget(Text, { text: 'this text should be not shown entirely', tokenizer: undefined });

  options.line = 5;
  options.title = 'no-ellipsis';
  const box5 = terminal.attachWidget(Box, options) as Box;
  box5.attachWidget(Text, { text: 'this text should be not shown entirely', tokenizer: undefined, ellipsis: '' });

  options.line = 9;
  options.title = 'h-scroll';
  const box6 = terminal.attachWidget(Box, options) as Box;
  const text6 = box6.attachWidget(Text, {
    text: 'this text should be scrolling horizontally',
    tokenizer: undefined,
    ellipsis: '',
  }) as Text;

  options.line = 13;
  options.height = 5;
  options.title = 'long-word';
  const box7 = terminal.attachWidget(Box, options) as Box;
  const text7 = box7.attachWidget(Text, {
    text: 'veeeerylongword whichdoesn\'tfitonelineatall :)',
  }) as Text;

  scrollText([text1, text2, text7]);
  autoSkipText([text6], options.width - 2);
  (window as TestWindow).terminal = terminal;
}

load()
  .then(run);
