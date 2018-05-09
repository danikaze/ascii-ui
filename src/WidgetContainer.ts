import { Widget } from './Widget';

/**
 * A Widget that can contain other Widgets should implement several common methods
 * This is their interface
 */
export interface WidgetContainer {
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
   * Cycle over the focusable widgets
   *
   * @param reverse If `true` it will return the previous widget. Returns the next widget otherwise
   * @returns focused widget or `undefined` if finished the cycle
   */
  cycleFocus(reverse?: boolean): Widget;

  /**
   * Retrieve the focused widget if any
   *
   * @returns The focused widget or `undefined` if no one has the focus
   */
  getFocusedWidget(): Widget;
}

/**
 * Check if an object implements the `WidgetContainer` interface
 *
 * @param object object to check
 * @returns `true` if is a WidgetContainer`
 */
// tslint:disable-next-line:no-any
export function isWidgetContainer(object: any): object is WidgetContainer {
  return typeof(object) === 'object' && 'cycleFocus' in object;
}
