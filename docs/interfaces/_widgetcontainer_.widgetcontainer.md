[terminal-in-canvas](../README.md) > ["WidgetContainer"](../modules/_widgetcontainer_.md) > [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)



# Interface: WidgetContainer


A Widget that can contain other Widgets should implement several common methods This is their interface

## Implemented by

* [Box](../classes/_widgets_box_.box.md)
* [Grid](../classes/_widgets_grid_.grid.md)
* [Terminal](../classes/_terminal_.terminal.md)


## Methods
<a id="attachwidget"></a>

###  attachWidget

► **attachWidget**(...args: *`any`[]*): [Widget](../classes/_widget_.widget.md)



*Defined in [WidgetContainer.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/WidgetContainer.ts#L14)*



Attach a Widget to the container. The parameters depends on each container


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| args | `any`[]   |  - |





**Returns:** [Widget](../classes/_widget_.widget.md)
Attached Widget instance






___

<a id="dettachwidget"></a>

###  dettachWidget

► **dettachWidget**(widget: *[Widget](../classes/_widget_.widget.md)*): `boolean`



*Defined in [WidgetContainer.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/WidgetContainer.ts#L22)*



Dettach a widget from the container


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](../classes/_widget_.widget.md)   |  Widget to dettach |





**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found






___

<a id="getwidgetat"></a>

###  getWidgetAt

► **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](../classes/_widget_.widget.md)



*Defined in [WidgetContainer.ts:31](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/WidgetContainer.ts#L31)*



Get a previously attached widget by its position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the terminal |
| line | `number`   |  line of the terminal |





**Returns:** [Widget](../classes/_widget_.widget.md)
widget or `undefined` if not found






___


