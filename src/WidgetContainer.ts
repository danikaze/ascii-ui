/* tslint:disable:typedef */
import { Widget } from './Widget';

/**
 * A widget that can contains other widgets.
 * It provide the usual methods and others to control internal widgets.
 */
export abstract class WidgetContainer extends Widget {
  private static widgetIds: number = 0;
  private readonly attachedWidgets: Widget[] = [];

  /**
   * Attach a widget to this istance of the terminal
   *
   * @param widget instance of the widget to attach
   * @return handler of the attached widget. Required to deattach it.
   */
  protected attachWidget(widget: Widget): number {
    const handler = ++WidgetContainer.widgetIds;
    this.attachedWidgets[handler] = widget;

    return handler;
  }

  /**
   * Dettach a widget from this terminal
   *
   * @param handler Value returned by `attachWidget`
   */
  protected deattachWidget(handler: number): void {
    this.attachedWidgets[handler] = undefined;
  }
}
