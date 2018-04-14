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
}
