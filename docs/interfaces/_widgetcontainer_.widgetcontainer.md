[terminal-in-canvas](../README.md) > ["WidgetContainer"](../modules/_widgetcontainer_.md) > [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

# Interface: WidgetContainer

A Widget that can contain other Widgets should implement several common methods This is their interface

## Hierarchy

**WidgetContainer**

## Implemented by

* [Box](../classes/_widgets_box_.box.md)
* [Grid](../classes/_widgets_grid_.grid.md)
* [Terminal](../classes/_terminal_.terminal.md)

## Index

### Methods

* [__@iterator](_widgetcontainer_.widgetcontainer.md#___iterator)
* [attachWidget](_widgetcontainer_.widgetcontainer.md#attachwidget)
* [dettachWidget](_widgetcontainer_.widgetcontainer.md#dettachwidget)
* [getParent](_widgetcontainer_.widgetcontainer.md#getparent)
* [getWidgetAt](_widgetcontainer_.widgetcontainer.md#getwidgetat)

---

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(startWidget?: * [Widget](../classes/_widget_.widget.md) &#124; `number`*): [BidirectionalIterator](_widgetcontainer_.bidirectionaliterator.md)<[Widget](../classes/_widget_.widget.md)>

*Defined in [WidgetContainer.ts:83](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/WidgetContainer.ts#L83)*

Get a bidirectional iterator to move across the attached widgets of the container
*__example__*: // Given the items \[A, B, C, D\] of the WidgetContainer w it = wSymbol.iterator; it.next(); // A it.next(); // B it.next(); // C it.prev(); // B it.next(); // C it.next(); // D it.next(); // null

it = w[Symbol.iterator](C); it.next(); // D

it = w[Symbol.iterator](C); it.prev(); // B

it = w[Symbol.iterator](0); it.next(); // B

it = w[Symbol.iterator](2); it.prev(); // B

it = w[Symbol.iterator](-1); it.prev(); // D

it = w[Symbol.iterator](-2); it.prev(); // C

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` startWidget |  [Widget](../classes/_widget_.widget.md) &#124; `number`|  if specified, the next call will start with this widget (return the next or previous one) |

**Returns:** [BidirectionalIterator](_widgetcontainer_.bidirectionaliterator.md)<[Widget](../classes/_widget_.widget.md)>

___
<a id="attachwidget"></a>

###  attachWidget

▸ **attachWidget**<`WidgetClass`>(...args: *`any`[]*): `WidgetClass`

*Defined in [WidgetContainer.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/WidgetContainer.ts#L30)*

Attach a Widget to the container. The parameters depends on each container

**Type parameters:**

#### WidgetClass :  [Widget](../classes/_widget_.widget.md)
**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` args | `any`[] |

**Returns:** `WidgetClass`
Attached Widget instance

___
<a id="dettachwidget"></a>

###  dettachWidget

▸ **dettachWidget**(widget: *[Widget](../classes/_widget_.widget.md)*): `boolean`

*Defined in [WidgetContainer.ts:38](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/WidgetContainer.ts#L38)*

Dettach a widget from the container

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](../classes/_widget_.widget.md) |  Widget to dettach |

**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](_widgetcontainer_.widgetcontainer.md)

*Defined in [WidgetContainer.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/WidgetContainer.ts#L22)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getwidgetat"></a>

###  getWidgetAt

▸ **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](../classes/_widget_.widget.md)

*Defined in [WidgetContainer.ts:47](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/WidgetContainer.ts#L47)*

Get a previously attached widget by its position

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [Widget](../classes/_widget_.widget.md)
widget or `undefined` if not found

___

