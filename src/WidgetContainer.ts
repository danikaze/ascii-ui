import { Widget } from './Widget';

/**
 * Extended Iterator interface that will return a `next` and a `prev` methods.
 */
export interface BidirectionalIterator<T> extends Iterator<T> {
  // tslint:disable-next-line:no-any
  prev(): IteratorResult<T>;
  seek(value?: T | number): void;
}

/**
 * A Widget that can contain other Widgets should implement several common methods
 * This is their interface
 */
export interface WidgetContainer {
  /**
   * Get the reference to the parent of the widget, if any
   *
   * @returns parent if any, or `undefined`
   */
  getParent(): WidgetContainer;

  /**
   * Attach a Widget to the container.
   * The parameters depends on each container
   *
   * @returns Attached Widget instance
   */
  attachWidget(...args): Widget;

  /**
   * Dettach a widget from the container
   *
   * @param widget Widget to dettach
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  dettachWidget(widget: Widget): boolean;

  /**
   * Get a previously attached widget by its position
   *
   * @param column column of the terminal
   * @param line line of the terminal
   * @return widget or `undefined` if not found
   */
  getWidgetAt(column: number, line: number): Widget;

  /**
   * Get a bidirectional iterator to move across the attached widgets of the container
   *
   * @param startWidget if specified, the next call will start with this widget (return the next or previous one)
   *
   * @example
   * // Given the items [A, B, C, D] of the WidgetContainer w
   * it = w[Symbol.iterator]();
   * it.next(); // A
   * it.next(); // B
   * it.next(); // C
   * it.prev(); // B
   * it.next(); // C
   * it.next(); // D
   * it.next(); // null
   *
   * it = w[Symbol.iterator](C);
   * it.next(); // D
   *
   * it = w[Symbol.iterator](C);
   * it.prev(); // B
   *
   * it = w[Symbol.iterator](0);
   * it.next(); // B
   *
   * it = w[Symbol.iterator](2);
   * it.prev(); // B
   *
   * it = w[Symbol.iterator](-1);
   * it.prev(); // D
   *
   * it = w[Symbol.iterator](-2);
   * it.prev(); // C
   */
  [Symbol.iterator](startWidget?: Widget | number): BidirectionalIterator<Widget>;
}

/**
 * Check if an object implements the `WidgetContainer` interface
 *
 * @param object object to check
 * @returns `true` if is a WidgetContainer`
 */
// tslint:disable-next-line:no-any
export function isWidgetContainer(object: any): object is WidgetContainer {
  return typeof(object) === 'object' && 'attachWidget' in object;
}
