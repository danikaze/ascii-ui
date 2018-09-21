[terminal-in-canvas](../README.md) > ["widgets/Text"](../modules/_widgets_text_.md) > [Text](../classes/_widgets_text_.text.md)

# Class: Text

Display formatted text in the terminal, allowing vertical scroll

## Hierarchy

 [Widget](_widget_.widget.md)<[TextOptions](../interfaces/_widgets_text_.textoptions.md)>

**↳ Text**

## Index

### Constructors

* [constructor](_widgets_text_.text.md#constructor)

### Properties

* [allocated](_widgets_text_.text.md#allocated)
* [focused](_widgets_text_.text.md#focused)
* [options](_widgets_text_.text.md#options)
* [parent](_widgets_text_.text.md#parent)
* [terminal](_widgets_text_.text.md#terminal)
* [defaultOptions](_widgets_text_.text.md#defaultoptions)

### Methods

* [blur](_widgets_text_.text.md#blur)
* [destruct](_widgets_text_.text.md#destruct)
* [focus](_widgets_text_.text.md#focus)
* [getParent](_widgets_text_.text.md#getparent)
* [getPosition](_widgets_text_.text.md#getposition)
* [getSize](_widgets_text_.text.md#getsize)
* [getTextSize](_widgets_text_.text.md#gettextsize)
* [isAt](_widgets_text_.text.md#isat)
* [isFocusable](_widgets_text_.text.md#isfocusable)
* [isFocused](_widgets_text_.text.md#isfocused)
* [render](_widgets_text_.text.md#render)
* [scrollLines](_widgets_text_.text.md#scrolllines)
* [scrollPages](_widgets_text_.text.md#scrollpages)
* [setOptions](_widgets_text_.text.md#setoptions)
* [setScrollLine](_widgets_text_.text.md#setscrollline)
* [updateOptions](_widgets_text_.text.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Text**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Text](_widgets_text_.text.md)

*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Text.ts:67](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L67)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |
| options | [TextOptions](../interfaces/_widgets_text_.textoptions.md) |
| `Optional` parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md) |

**Returns:** [Text](_widgets_text_.text.md)

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

**● options**: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)* =  {} as any

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

**● defaultOptions**: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Text.ts:56](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L56)*

Default options for widget instances

___

## Methods

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
<a id="gettextsize"></a>

###  getTextSize

▸ **getTextSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Defined in [widgets/Text.ts:144](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L144)*

Get the size of the box if the text would be fully displayed

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the full text

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

*Defined in [widgets/Text.ts:81](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L81)*

Render the widget in the associated terminal

**Returns:** `void`

___
<a id="scrolllines"></a>

###  scrollLines

▸ **scrollLines**(lines: *`number`*): `boolean`

*Defined in [widgets/Text.ts:188](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L188)*

Move the starting line of the text

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| lines | `number` |  Number of lines to scroll the text |

**Returns:** `boolean`
`true` if there is more content after `line`, or `false` if it was the last line

___
<a id="scrollpages"></a>

###  scrollPages

▸ **scrollPages**(pages: *`number`*): `boolean`

*Defined in [widgets/Text.ts:198](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L198)*

Move the starting line of the text by pages

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pages | `number` |  Number of pages to scroll |

**Returns:** `boolean`
`true` if there is more pages or `false` if it was the last one

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*): `void`

*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

*Defined in [Widget.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L86)*

Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [TextOptions](../interfaces/_widgets_text_.textoptions.md) |  Options to change. |

**Returns:** `void`

___
<a id="setscrollline"></a>

###  setScrollLine

▸ **setScrollLine**(line: *`number`*): `boolean`

*Defined in [widgets/Text.ts:157](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L157)*

Set the starting line of the text

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  First line to draw |

**Returns:** `boolean`
`true` if there is more content after `line`, or `false` if it was the end

___
<a id="updateoptions"></a>

### `<Protected>` updateOptions

▸ **updateOptions**(changes: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*): `void`

*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Text.ts:208](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Text.ts#L208)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [TextOptions](../interfaces/_widgets_text_.textoptions.md) |  Object with only the changed options |

**Returns:** `void`

___

