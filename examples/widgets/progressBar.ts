/* tslint:disable:no-magic-numbers */
import { TerminalOptions } from '@src/Terminal';
import { ProgressBar, ProgressBarDirection } from '@src/widgets/ProgressBar';

import { load } from '../util/load';

function enableTimeProgress(bars: ProgressBar[]): void {
  function changeProgress(bar, time, delta) {
    let progress = bar.getProgress() + delta;
    if (progress > 1) {
      progress = 1;
    }
    bar.setOptions({ progress });

    if (progress < 1) {
      setTimeout(changeProgress, time, bar, time, delta);
    } else {
      setTimeout(resetProgress, 2000, bar);
    }
  }

  function resetProgress(bar) {
    bar.setOptions({ progress: 0 });
    const time = Math.random() * 600 + 200;
    const delta = Math.random() / 20 + 0.01;
    setTimeout(changeProgress, time, bar, time, delta);
  }

  bars.forEach((bar) => {
    const time = Math.random() * 600 + 200;
    const delta = Math.random() / 20 + 0.01;
    setTimeout(changeProgress, time, bar, time, delta);
  });
}

function run({ terminal }): void {
  const baseOptions = {
    col: 1,
    line: 1,
    width: 20,
    height: 11,
  };

  // horizontal bars

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 1,
    progress: 0,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 3,
    progress: 0.25,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 5,
    progress: 0.5,
    startStyle: { char: '', bg: '#005500' },
    endStyle: { char: '', bg: '#005500' },
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 7,
    progress: 0.75,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 9,
    progress: 1,
  });

  const horizontalBar: ProgressBar = terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    line: 11,
    progress: 0,
    completedStyle: { char: '=', fg: '#00ff00', bg: '#000000' },
    pendingStyle: { char: '-', fg: '#00ff00', bg: '#000000' },
    currentStyle: { char: '>', fg: '#00ff00', bg: '#000000' },
    startStyle: { char: '[', fg: '#00ff00', bg: '#000000' },
    endStyle: { char: ']', fg: '#00ff00', bg: '#000000' },
  });

  // vertical bars

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 25,
    progress: 0,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 27,
    progress: 0.25,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 29,
    progress: 0.5,
    startStyle: { char: '', bg: '#005500' },
    endStyle: { char: '', bg: '#005500' },
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 31,
    progress: 0.75,
  });

  terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 33,
    progress: 1,
  });

  const verticalBar: ProgressBar = terminal.attachWidget(ProgressBar, {
    ...baseOptions,
    direction: ProgressBarDirection.VERTICAL,
    col: 35,
    progress: 0,
    completedStyle: { char: '#', fg: '#00ff00', bg: '#000000' },
    pendingStyle: { char: '|', fg: '#00ff00', bg: '#000000' },
    currentStyle: { char: 'o', fg: '#00ff00', bg: '#000000' },
    startStyle: { char: '=', fg: '#00ff00', bg: '#000000' },
    endStyle: { char: '=', fg: '#00ff00', bg: '#000000' },
  });

  enableTimeProgress([horizontalBar, verticalBar]);
}

const terminalOptions: TerminalOptions = {
  columns: 40,
  rows: 20,
  cursor: false,
  verbose: true,
};

load(terminalOptions)
  .then(run);
