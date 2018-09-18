[terminal-in-canvas](../README.md) > ["Widget"](../modules/_widget_.md) > [Widget](../classes/_widget_.widget.md)

# Class: Widget

A widget is just a self-contained graphic part of the terminal, which manages its own state.

## Type parameters
#### OptionsType :  [WidgetOptions](../interfaces/_widget_.widgetoptions.md)
## Hierarchy

**Widget**

↳  [Box](_widgets_box_.box.md)

↳  [Grid](_widgets_grid_.grid.md)

↳  [Input](_widgets_input_.input.md)

↳  [ProgressBar](_widgets_progressbar_.progressbar.md)

↳  [Select](_widgets_select_.select.md)

↳  [Text](_widgets_text_.text.md)

## Index

### Constructors

* [constructor](_widget_.widget.md#constructor)

### Properties

* [allocated](_widget_.widget.md#allocated)
* [focused](_widget_.widget.md#focused)
* [options](_widget_.widget.md#options)
* [parent](_widget_.widget.md#parent)
* [terminal](_widget_.widget.md#terminal)
* [defaultOptions](_widget_.widget.md#defaultoptions)

### Methods

* [blur](_widget_.widget.md#blur)
* [destruct](_widget_.widget.md#destruct)
* [focus](_widget_.widget.md#focus)
* [getParent](_widget_.widget.md#getparent)
* [getPosition](_widget_.widget.md#getposition)
* [getSize](_widget_.widget.md#getsize)
* [isAt](_widget_.widget.md#isat)
* [isFocusable](_widget_.widget.md#isfocusable)
* [isFocused](_widget_.widget.md#isfocused)
* [render](_widget_.widget.md#render)
* [setOptions](_widget_.widget.md#setoptions)
* [updateOptions](_widget_.widget.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Widget**(terminal: *[Terminal](_terminal_.terminal.md)*, options?: *`OptionsType`*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Widget](_widget_.widget.md)

*Defined in [Widget.ts:38](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L38)*

A Widget is created in the context of a specific terminal, in a position and with a provided height

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |  Terminal where to render the widget |
| `Optional` options | `OptionsType` |  Widget options |
| `Optional` parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md) |  Parent container, if any |

**Returns:** [Widget](_widget_.widget.md)

___

## Properties

<a id="allocated"></a>

### `<Protected>` allocated

**● allocated**: *`boolean`*

*Defined in [Widget.ts:38](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L38)*

If the widget has been allocated or not

___
<a id="focused"></a>

### `<Protected>` focused

**● focused**: *`boolean`*

*Defined in [Widget.ts:36](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L36)*

If the widget is focused or not

___
<a id="options"></a>

### `<Protected>` options

**● options**: *`OptionsType`* =  {} as any

*Defined in [Widget.ts:34](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L34)*

Widget options

___
<a id="parent"></a>

### `<Protected>``<Optional>` parent

**● parent**: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*

*Defined in [Widget.ts:32](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L32)*

container of the widget, if any

___
<a id="terminal"></a>

### `<Protected>` terminal

**● terminal**: *[Terminal](_terminal_.terminal.md)*

*Defined in [Widget.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L30)*

Reference to the parent terminal where it should be rendered

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*

*Defined in [Widget.ts:27](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L27)*

Default options for widget instances

___

## Methods

<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Defined in [Widget.ts:175](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L175)*

Remove the focus from this widget. Usually done by a upper level that controls other widgets.

**Returns:** `boolean`
`true` if it was focused and blurred properly

___
<a id="destruct"></a>

###  destruct

▸ **destruct**(): `void`

*Defined in [Widget.ts:60](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L60)*

Method to call when the widget is not going to be used anymore, so it can clean whatever it set in the constructor

**Returns:** `void`

___
<a id="focus"></a>

###  focus

▸ **focus**(): `boolean`

*Defined in [Widget.ts:155](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L155)*

Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)

**Returns:** `boolean`
`true` if it wasn't focused and focused properly

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Defined in [Widget.ts:69](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L69)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Defined in [Widget.ts:117](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L117)*

Get the position of the widget, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Defined in [Widget.ts:105](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L105)*

Get the widget size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles

___
<a id="isat"></a>

###  isAt

▸ **isAt**(column: *`number`*, line: *`number`*): `boolean`

*Defined in [Widget.ts:131](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L131)*

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

*Defined in [Widget.ts:145](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L145)*

Check if this widget is focusable (when cycling over widgets)

**Returns:** `boolean`
`true` if focusable, `false` if not

___
<a id="isfocused"></a>

###  isFocused

▸ **isFocused**(): `boolean`

*Defined in [Widget.ts:190](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L190)*

Check if the widget is currently focused or not

**Returns:** `boolean`
if the widget is focused or not.

___
<a id="render"></a>

### `<Abstract>` render

▸ **render**(): `void`

*Defined in [Widget.ts:197](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L197)*

Render the widget in the associated terminal (if any)

**Returns:** `void`

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *`OptionsType`*): `void`

*Defined in [Widget.ts:85](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L85)*

Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `OptionsType` |  Options to change. |

**Returns:** `void`

___
<a id="updateoptions"></a>

### `<Protected>``<Abstract>` updateOptions

▸ **updateOptions**(changedOptions: *`OptionsType`*): `void`

*Defined in [Widget.ts:205](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L205)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changedOptions | `OptionsType` |  Object with only the changed options |

**Returns:** `void`

___

