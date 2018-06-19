import { BidirectionalIterator, isWidgetContainer } from './WidgetContainer';

import { Terminal } from './Terminal';
import { Widget } from './Widget';

/**
 * Manage the focus behavior around the widgets of a Terminal
 */
export class FocusManager {
  private terminal: Terminal;
  private iterators: Array<BidirectionalIterator<Widget>>;
  private currentIterator: BidirectionalIterator<Widget>;
  private focusedWidget: Widget;

  constructor(terminal: Terminal, canvas: HTMLCanvasElement) {
    this.terminal = terminal;
    this.currentIterator = terminal[Symbol.iterator]();
    this.iterators = [this.currentIterator];
  }

  /**
   * Focus the next widget
   */
  next(): void {
    this.iterate('next');
  }

  /**
   * Focus the previous widget
   */
  prev(): void {
    this.iterate('prev');
  }

  /**
   * Iterate through the terminal widgets
   *
   * @param method `prev` or `next`
   */
  private iterate(method: string): void {
    const startWidget = this.focusedWidget;
    let widget: Widget;
    let found;
    let focusableIterator;

    while (!found) {
      widget = this.currentIterator[method]().value;

      if (widget) {
        if (isWidgetContainer(widget)) {
          if (widget.isFocusable()) {
            focusableIterator = widget;
          }
          this.currentIterator = widget[Symbol.iterator](method === 'prev' ? -1 : undefined);
          this.iterators.push(this.currentIterator);
        } else if (widget.isFocusable()) {
          found = widget;
          break;
        }
      } else if (focusableIterator) {
        found = focusableIterator;
        break;
      } else if (this.iterators.length > 1) {
        this.iterators.pop();
        this.currentIterator = this.iterators[this.iterators.length - 1];
      } else {
        this.currentIterator = this.terminal[Symbol.iterator](method === 'prev' ? -1 : undefined);
        this.iterators = [this.currentIterator];
      }

      if (widget === startWidget) {
        break;
      }
    }

    this.updateFocusedWidget(found);
  }

  /**
   * Set the new focused widget as focused, and blur the changed part of the path.
   * Instead of setting all the previous path unfocused and then focus the new path, it just unfocus and focus
   * the differences to avoid possible flickering
   *
   * @param newWidget New focused widget
   */
  private updateFocusedWidget(newWidget: Widget): void {
    const oldPath = this.focusedWidget ? this.terminal.getWidgetPath(this.focusedWidget) : [];
    const newPath = newWidget ? this.terminal.getWidgetPath(newWidget) : [];

    oldPath.filter((w) => newPath.indexOf(w) === -1)
      .forEach((w: Widget) => {
        w.blur();
      });

    newPath.forEach((w: Widget) => {
      w.focus();
    });

    this.focusedWidget = newWidget;
  }
}
