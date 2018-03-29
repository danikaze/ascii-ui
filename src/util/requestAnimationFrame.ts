type requestAnimationFrameFn = (callback: FrameRequestCallback) => number;

interface VendorWindow extends Window {
  mozRequestAnimationFrame?: requestAnimationFrameFn;
  oRequestAnimationFrame?: requestAnimationFrameFn;
  msRequestAnimationFrame?: requestAnimationFrameFn;
}

/**
 * Polyfill for `window.requestAnimationFrame`
 * @param callback
 */
function customRequestAnimationFrame(callback: FrameRequestCallback): number {
  return window.setTimeout(
    () => {
      callback(window.performance.now());
    },
    // tslint:disable-next-line:no-magic-numbers
    1000 / 60,
  );
}

export const requestAnimationFrame: requestAnimationFrameFn = window.requestAnimationFrame.bind(window) ||
  window.webkitRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).mozRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).oRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).msRequestAnimationFrame.bind(window) ||
  customRequestAnimationFrame;
