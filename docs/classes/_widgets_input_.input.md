[terminal-in-canvas](../README.md) > ["widgets/Input"](../modules/_widgets_input_.md) > [Input](../classes/_widgets_input_.input.md)

# Class: Input

One line text input widget

## Hierarchy

 [Widget](_widget_.widget.md)<[InputOptions](../interfaces/_widgets_input_.inputoptions.md)>

**↳ Input**

## Index

### Constructors

* [constructor](_widgets_input_.input.md#constructor)

### Properties

* [allocated](_widgets_input_.input.md#allocated)
* [focused](_widgets_input_.input.md#focused)
* [options](_widgets_input_.input.md#options)
* [parent](_widgets_input_.input.md#parent)
* [terminal](_widgets_input_.input.md#terminal)
* [defaultOptions](_widgets_input_.input.md#defaultoptions)

### Methods

* [blur](_widgets_input_.input.md#blur)
* [destruct](_widgets_input_.input.md#destruct)
* [focus](_widgets_input_.input.md#focus)
* [getParent](_widgets_input_.input.md#getparent)
* [getPosition](_widgets_input_.input.md#getposition)
* [getSize](_widgets_input_.input.md#getsize)
* [getValue](_widgets_input_.input.md#getvalue)
* [isAt](_widgets_input_.input.md#isat)
* [isFocusable](_widgets_input_.input.md#isfocusable)
* [isFocused](_widgets_input_.input.md#isfocused)
* [render](_widgets_input_.input.md#render)
* [setOptions](_widgets_input_.input.md#setoptions)
* [setValue](_widgets_input_.input.md#setvalue)
* [updateOptions](_widgets_input_.input.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Input**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[InputOptions](../interfaces/_widgets_input_.inputoptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Input](_widgets_input_.input.md)

*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Input.ts:29](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |
| options | [InputOptions](../interfaces/_widgets_input_.inputoptions.md) |
| `Optional` parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md) |

**Returns:** [Input](_widgets_input_.input.md)

___

## Properties

<a id="allocated"></a>

### `<Protected>` allocated

**● allocated**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[allocated](_widget_.widget.md#allocated)*

*Defined in [Widget.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L39)*

If the widget has been allocated or not

___
<a id="focused"></a>

### `<Protected>` focused

**● focused**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:37](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L37)*

If the widget is focused or not

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[InputOptions](../interfaces/_widgets_input_.inputoptions.md)* =  {} as any

*Inherited from [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [Widget.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L35)*

Widget options

___
<a id="parent"></a>

### `<Protected>``<Optional>` parent

**● parent**: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*

*Inherited from [Widget](_widget_.widget.md).[parent](_widget_.widget.md#parent)*

*Defined in [Widget.ts:33](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L33)*

container of the widget, if any

___
<a id="terminal"></a>

### `<Protected>` terminal

**● terminal**: *[Terminal](_terminal_.terminal.md)*

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:31](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L31)*

Reference to the parent terminal where it should be rendered

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[InputOptions](../interfaces/_widgets_input_.inputoptions.md)*

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Input.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L22)*

Default options for widget instances

___

## Methods

<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Overrides [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [widgets/Input.ts:101](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L101)*

Remove the focus from this widget. Usually done by a upper level that controls other widgets.

**Returns:** `boolean`

___
<a id="destruct"></a>

###  destruct

▸ **destruct**(): `void`

*Inherited from [Widget](_widget_.widget.md).[destruct](_widget_.widget.md#destruct)*

*Defined in [Widget.ts:61](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L61)*

Method to call when the widget is not going to be used anymore, so it can clean whatever it set in the constructor

**Returns:** `void`

___
<a id="focus"></a>

###  focus

▸ **focus**(): `boolean`

*Overrides [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [widgets/Input.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L86)*

Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)

**Returns:** `boolean`

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Inherited from [Widget](_widget_.widget.md).[getParent](_widget_.widget.md#getparent)*

*Defined in [Widget.ts:70](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L70)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L118)*

Get the position of the widget, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:106](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L106)*

Get the widget size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles

___
<a id="getvalue"></a>

###  getValue

▸ **getValue**(showPassword?: *`boolean`*): `string`

*Defined in [widgets/Input.ts:63](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L63)*

Get the current value of the input text

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` showPassword | `boolean` |  if this is not \`true\` when the input is set as password, the returned value will be hidden |

**Returns:** `string`
current value

___
<a id="isat"></a>

###  isAt

▸ **isAt**(column: *`number`*, line: *`number`*): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isAt](_widget_.widget.md#isat)*

*Defined in [Widget.ts:132](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L132)*

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

*Defined in [Widget.ts:146](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L146)*

Check if this widget is focusable (when cycling over widgets)

**Returns:** `boolean`
`true` if focusable, `false` if not

___
<a id="isfocused"></a>

###  isFocused

▸ **isFocused**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:191](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L191)*

Check if the widget is currently focused or not

**Returns:** `boolean`
if the widget is focused or not.

___
<a id="render"></a>

###  render

▸ **render**(): `void`

*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Input.ts:42](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L42)*

Render the widget in the associated terminal

**Returns:** `void`

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *[InputOptions](../interfaces/_widgets_input_.inputoptions.md)*): `void`

*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

*Defined in [Widget.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/Widget.ts#L86)*

Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [InputOptions](../interfaces/_widgets_input_.inputoptions.md) |  Options to change. |

**Returns:** `void`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**(value: *`string`*): `void`

*Defined in [widgets/Input.ts:74](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L74)*

Set the new value of the input text

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `string` |  new value to be set |

**Returns:** `void`

___
<a id="updateoptions"></a>

### `<Protected>` updateOptions

▸ **updateOptions**(changes: *[InputOptions](../interfaces/_widgets_input_.inputoptions.md)*): `void`

*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Input.ts:117](https://github.com/danikaze/terminal-in-canvas/blob/a5ea4f7/src/widgets/Input.ts#L117)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [InputOptions](../interfaces/_widgets_input_.inputoptions.md) |  Object with only the changed options |

**Returns:** `void`

___

