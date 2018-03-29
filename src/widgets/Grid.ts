import { Terminal } from '../Terminal';
import { Widget, WidgetOptions } from '../Widget';
import { WidgetContainer } from '../WidgetContainer';

import { GridRow } from './GridRow';

export interface GridOptions extends WidgetOptions {
  rows: number;
  columns: number;
}

interface AttachedWidget {
  /** interal id used for deattachWidget */
  id: number;
  /** widget instance */
  widget: Widget;
  /** x-position in grid columns */
  col: number;
  /** y-position in grid rows */
  line: number;
  /** width in grid columns */
  width: number;
  /** height in grid rows */
  height: number;
}

export class Grid extends Widget {
  private static widgetIds: number = 0;

  protected options: GridOptions;
  private readonly attachedWidgets: AttachedWidget[] = [];

  constructor(terminal: Terminal, options: GridOptions) {
    super(terminal, options);
  }

  render(): void {
    this.attachedWidgets.forEach((instance) => {
      instance.widget.render();
    });
  }

  /**
   * Here's where the calculation of the real size of the attached widget is done
   * Widget won't be placed properly until this method is not called (to avoid duplicated calculations)
   */
  align(): void {
    const terminalSize = this.terminal.getSize();
    const tilesPerColumn = Math.floor(terminalSize.columns / this.options.columns);
    const tilesPerRow = Math.floor(terminalSize.rows / this.options.rows);

    // this.attachedWidgets.forEach((instance) => {

    // });
  }

  /**
   * Attach a widget to this instance of the terminal
   *
   * @param widget instance of the widget to attach
   * @return handler of the attached widget. Required to deattach it.
   */
  attachWidget(col: number, line: number, width: number, height: number, WidgetClass: typeof Widget, ...args): number {
    const widget: Widget = Reflect.construct(WidgetClass, [this.terminal, ...args]);
    const attachedWidget: AttachedWidget = {
      id: ++Grid.widgetIds,
      widget,
      col,
      line,
      width,
      height,
    };

    this.attachedWidgets.push(attachedWidget);

    return attachedWidget.id;
  }

  /**
   * Dettach a widget from this terminal
   *
   * @param handler Value returned by `attachWidget`
   * @return `true` if the widget was found (and removed). `false` if not found
   */
  deattachWidget(handler: number): boolean {
    const index = this.attachedWidgets.findIndex((instance) => instance.id === handler);
    if (index !== -1) {
      this.attachedWidgets.splice(index, 1);
    }

    return index !== -1;
  }
}
