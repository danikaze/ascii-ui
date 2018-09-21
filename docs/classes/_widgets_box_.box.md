[terminal-in-canvas](../README.md) > ["widgets/Box"](../modules/_widgets_box_.md) > [Box](../classes/_widgets_box_.box.md)

# Class: Box

Very basic `WidgetContainer` which draws a box around the attached content. It allows only one children inside the box (which can be a Grid or any other container)

## Hierarchy

 [Widget](_widget_.widget.md)<[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)>

**↳ Box**

## Implements

* [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

## Index

### Constructors

* [constructor](_widgets_box_.box.md#constructor)

### Properties

* [allocated](_widgets_box_.box.md#allocated)
* [focused](_widgets_box_.box.md#focused)
* [options](_widgets_box_.box.md#options)
* [parent](_widgets_box_.box.md#parent)
* [terminal](_widgets_box_.box.md#terminal)
* [defaultOptions](_widgets_box_.box.md#defaultoptions)

### Methods

* [__@iterator](_widgets_box_.box.md#___iterator)
* [attachWidget](_widgets_box_.box.md#attachwidget)
* [blur](_widgets_box_.box.md#blur)
* [destruct](_widgets_box_.box.md#destruct)
* [dettachWidget](_widgets_box_.box.md#dettachwidget)
* [focus](_widgets_box_.box.md#focus)
* [getParent](_widgets_box_.box.md#getparent)
* [getPosition](_widgets_box_.box.md#getposition)
* [getSize](_widgets_box_.box.md#getsize)
* [getWidgetAt](_widgets_box_.box.md#getwidgetat)
* [isAt](_widgets_box_.box.md#isat)
* [isFocusable](_widgets_box_.box.md#isfocusable)
* [isFocused](_widgets_box_.box.md#isfocused)
* [render](_widgets_box_.box.md#render)
* [setOptions](_widgets_box_.box.md#setoptions)
* [updateOptions](_widgets_box_.box.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Box**(terminal: *[Terminal](_terminal_.terminal.md)*, options?: *[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Box](_widgets_box_.box.md)

*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Box.ts:102](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L102)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |
| `Optional` options | [BoxOptions](../interfaces/_widgets_box_.boxoptions.md) |
| `Optional` parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md) |

**Returns:** [Box](_widgets_box_.box.md)

___

## Properties

<a id="allocated"></a>

### `<Protected>` allocated

**● allocated**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[allocated](_widget_.widget.md#allocated)*

*Defined in [Widget.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L39)*

If the widget has been allocated or not

___
<a id="focused"></a>

### `<Protected>` focused

**● focused**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:37](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L37)*

If the widget is focused or not

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)* =  {} as any

*Inherited from [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [Widget.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L35)*

Widget options

___
<a id="parent"></a>

### `<Protected>``<Optional>` parent

**● parent**: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*

*Inherited from [Widget](_widget_.widget.md).[parent](_widget_.widget.md#parent)*

*Defined in [Widget.ts:33](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L33)*

container of the widget, if any

___
<a id="terminal"></a>

### `<Protected>` terminal

**● terminal**: *[Terminal](_terminal_.terminal.md)*

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:31](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L31)*

Reference to the parent terminal where it should be rendered

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)*

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Box.ts:82](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L82)*

Default options for widget instances

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(startWidget?: * [Widget](_widget_.widget.md) &#124; `number`*): [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)<[Widget](_widget_.widget.md)>

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[__@iterator](../interfaces/_widgetcontainer_.widgetcontainer.md#___iterator)*

*Defined in [widgets/Box.ts:211](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L211)*

Get a bidirectional iterator to move across the attached widgets of the container

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` startWidget |  [Widget](_widget_.widget.md) &#124; `number`|  if specified, the next call will start with this widget (return the next or previous one) |

**Returns:** [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)<[Widget](_widget_.widget.md)>

___
<a id="attachwidget"></a>

###  attachWidget

▸ **attachWidget**<`WidgetType`>(WidgetClass: *[WidgetConstructor](../modules/_widget_.md#widgetconstructor)<`WidgetType`>*, options: *`any`*): `WidgetType`

*Defined in [widgets/Box.ts:147](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L147)*

Create and attach a widget to this instance of the terminal

**Type parameters:**

#### WidgetType :  [Widget](_widget_.widget.md)
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| WidgetClass | [WidgetConstructor](../modules/_widget_.md#widgetconstructor)<`WidgetType`> |  Class of the widget |
| options | `any` |  Options for the widget constructor |

**Returns:** `WidgetType`
Created widget instance attached to the box

___
<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:176](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L176)*

Remove the focus from this widget. Usually done by a upper level that controls other widgets.

**Returns:** `boolean`
`true` if it was focused and blurred properly

___
<a id="destruct"></a>

###  destruct

▸ **destruct**(): `void`

*Inherited from [Widget](_widget_.widget.md).[destruct](_widget_.widget.md#destruct)*

*Defined in [Widget.ts:61](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L61)*

Method to call when the widget is not going to be used anymore, so it can clean whatever it set in the constructor

**Returns:** `void`

___
<a id="dettachwidget"></a>

###  dettachWidget

▸ **dettachWidget**(widget: *[Widget](_widget_.widget.md)*): `boolean`

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[dettachWidget](../interfaces/_widgetcontainer_.widgetcontainer.md#dettachwidget)*

*Defined in [widgets/Box.ts:171](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L171)*

Dettach a widget from the container

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md) |  Widget to dettach |

**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found

___
<a id="focus"></a>

###  focus

▸ **focus**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L156)*

Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)

**Returns:** `boolean`
`true` if it wasn't focused and focused properly

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getParent](../interfaces/_widgetcontainer_.widgetcontainer.md#getparent)*

*Inherited from [Widget](_widget_.widget.md).[getParent](_widget_.widget.md#getparent)*

*Defined in [Widget.ts:70](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L70)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L118)*

Get the position of the widget, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:106](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L106)*

Get the widget size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles

___
<a id="getwidgetat"></a>

###  getWidgetAt

▸ **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [widgets/Box.ts:200](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L200)*

Get a previously attached widget by its position

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found

___
<a id="isat"></a>

###  isAt

▸ **isAt**(column: *`number`*, line: *`number`*): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isAt](_widget_.widget.md#isat)*

*Defined in [Widget.ts:132](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L132)*

Check if the widget is (overlaps) the specified position

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  x-position of the terminal (in tiles) |
| line | `number` |  y-position of the terminal (in tiles) |

**Returns:** `boolean`
`true` if the specified tile is _inside_ the widget

___
<a id="isfocusable"></a>

###  isFocusable

▸ **isFocusable**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isFocusable](_widget_.widget.md#isfocusable)*

*Defined in [Widget.ts:146](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L146)*

Check if this widget is focusable (when cycling over widgets)

**Returns:** `boolean`
`true` if focusable, `false` if not

___
<a id="isfocused"></a>

###  isFocused

▸ **isFocused**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:191](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L191)*

Check if the widget is currently focused or not

**Returns:** `boolean`
if the widget is focused or not.

___
<a id="render"></a>

###  render

▸ **render**(): `void`

*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Box.ts:115](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L115)*

Render the widget in the associated terminal

**Returns:** `void`

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)*): `void`

*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

*Defined in [Widget.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L86)*

Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [BoxOptions](../interfaces/_widgets_box_.boxoptions.md) |  Options to change. |

**Returns:** `void`

___
<a id="updateoptions"></a>

### `<Protected>` updateOptions

▸ **updateOptions**(changes: *[BoxOptions](../interfaces/_widgets_box_.boxoptions.md)*): `void`

*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Box.ts:262](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Box.ts#L262)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type |
| ------ | ------ |
| changes | [BoxOptions](../interfaces/_widgets_box_.boxoptions.md) |

**Returns:** `void`

___

