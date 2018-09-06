[terminal-in-canvas](../README.md) > ["widgets/Select"](../modules/_widgets_select_.md) > [Select](../classes/_widgets_select_.select.md)

# Class: Select

Display a list of selectable options

## Type parameters
#### T 
## Hierarchy

 [Widget](_widget_.widget.md)<[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>>

**↳ Select**

## Index

### Constructors

* [constructor](_widgets_select_.select.md#constructor)

### Properties

* [allocated](_widgets_select_.select.md#allocated)
* [focused](_widgets_select_.select.md#focused)
* [options](_widgets_select_.select.md#options)
* [parent](_widgets_select_.select.md#parent)
* [terminal](_widgets_select_.select.md#terminal)
* [defaultOptions](_widgets_select_.select.md#defaultoptions)

### Methods

* [blur](_widgets_select_.select.md#blur)
* [focus](_widgets_select_.select.md#focus)
* [getOptionAt](_widgets_select_.select.md#getoptionat)
* [getParent](_widgets_select_.select.md#getparent)
* [getPosition](_widgets_select_.select.md#getposition)
* [getSelectedIndex](_widgets_select_.select.md#getselectedindex)
* [getSelectedOption](_widgets_select_.select.md#getselectedoption)
* [getSize](_widgets_select_.select.md#getsize)
* [isAt](_widgets_select_.select.md#isat)
* [isFocusable](_widgets_select_.select.md#isfocusable)
* [isFocused](_widgets_select_.select.md#isfocused)
* [next](_widgets_select_.select.md#next)
* [prev](_widgets_select_.select.md#prev)
* [render](_widgets_select_.select.md#render)
* [selectIndex](_widgets_select_.select.md#selectindex)
* [selectOption](_widgets_select_.select.md#selectoption)
* [selectValue](_widgets_select_.select.md#selectvalue)
* [setOptions](_widgets_select_.select.md#setoptions)
* [updateOptions](_widgets_select_.select.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Select**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Select](_widgets_select_.select.md)

*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Select.ts:54](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L54)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |
| options | [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`> |
| `Optional` parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md) |

**Returns:** [Select](_widgets_select_.select.md)

___

## Properties

<a id="allocated"></a>

### `<Protected>` allocated

**● allocated**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[allocated](_widget_.widget.md#allocated)*

*Defined in [Widget.ts:38](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L38)*

If the widget has been allocated or not

___
<a id="focused"></a>

### `<Protected>` focused

**● focused**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:36](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L36)*

If the widget is focused or not

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>* =  {} as any

*Inherited from [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [Widget.ts:34](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L34)*

Widget options

___
<a id="parent"></a>

### `<Protected>``<Optional>` parent

**● parent**: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*

*Inherited from [Widget](_widget_.widget.md).[parent](_widget_.widget.md#parent)*

*Defined in [Widget.ts:32](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L32)*

container of the widget, if any

___
<a id="terminal"></a>

### `<Protected>` terminal

**● terminal**: *[Terminal](_terminal_.terminal.md)*

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L30)*

Reference to the parent terminal where it should be rendered

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`any`>*

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Select.ts:47](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L47)*

Default options for widget instances

___

## Methods

<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:167](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L167)*

Remove the focus from this widget. Usually done by a upper level that controls other widgets.

**Returns:** `boolean`
`true` if it was focused and blurred properly

___
<a id="focus"></a>

###  focus

▸ **focus**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:147](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L147)*

Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)

**Returns:** `boolean`
`true` if it wasn't focused and focused properly

___
<a id="getoptionat"></a>

###  getOptionAt

▸ **getOptionAt**(column: *`number`*, line: *`number`*): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>

*Defined in [widgets/Select.ts:136](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L136)*

Get the option at the specified terminal position (absolute)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>
option or `undefined` if not found

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Inherited from [Widget](_widget_.widget.md).[getParent](_widget_.widget.md#getparent)*

*Defined in [Widget.ts:61](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L61)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:109](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L109)*

Get the position of the widget, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates

___
<a id="getselectedindex"></a>

###  getSelectedIndex

▸ **getSelectedIndex**(): `number`

*Defined in [widgets/Select.ts:125](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L125)*

Retrieve the index of the currently selected option

**Returns:** `number`
index of the selected option or `UNSELECTED_INDEX` if no one is selected

___
<a id="getselectedoption"></a>

###  getSelectedOption

▸ **getSelectedOption**(): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>

*Defined in [widgets/Select.ts:116](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L116)*

Retrieve a reference to the currently selected option. Even if it's a reference, don't update it directly, but use `setOptions` to allow the widget to apply the changes

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>
Object specified in `options.options`.

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:97](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L97)*

Get the widget size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles

___
<a id="isat"></a>

###  isAt

▸ **isAt**(column: *`number`*, line: *`number`*): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isAt](_widget_.widget.md#isat)*

*Defined in [Widget.ts:123](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L123)*

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

*Defined in [Widget.ts:137](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L137)*

Check if this widget is focusable (when cycling over widgets)

**Returns:** `boolean`
`true` if focusable, `false` if not

___
<a id="isfocused"></a>

###  isFocused

▸ **isFocused**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:182](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L182)*

Check if the widget is currently focused or not

**Returns:** `boolean`
if the widget is focused or not.

___
<a id="next"></a>

###  next

▸ **next**(): `boolean`

*Defined in [widgets/Select.ts:263](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L263)*

Select the next option to the current one

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="prev"></a>

###  prev

▸ **prev**(): `boolean`

*Defined in [widgets/Select.ts:254](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L254)*

Select the previous option to the current one

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="render"></a>

###  render

▸ **render**(): `void`

*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Select.ts:75](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L75)*

Render the widget in the associated terminal

**Returns:** `void`

___
<a id="selectindex"></a>

###  selectIndex

▸ **selectIndex**(index: *`number`*): `boolean`

*Defined in [widgets/Select.ts:168](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L168)*

Select the option with the specified index. This will do nothing if the option is disabled or the index not found.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  New index to set as selected (starting on 0) |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="selectoption"></a>

###  selectOption

▸ **selectOption**(option: *[SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>*): `boolean`

*Defined in [widgets/Select.ts:233](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L233)*

Select the specified option. This will do nothing the option is disabled or not found

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| option | [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`> |  Explicit option to select |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="selectvalue"></a>

###  selectValue

▸ **selectValue**(value: *`T`*): `boolean`

*Defined in [widgets/Select.ts:210](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L210)*

Select the first option with the specified value. This will do nothing if all the options with that value are disabled there's no one with the specified value.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  Value to search the option by |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>*): `void`

*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

*Defined in [Widget.ts:77](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L77)*

Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`> |  Options to change. |

**Returns:** `void`

___
<a id="updateoptions"></a>

### `<Protected>` updateOptions

▸ **updateOptions**(changes: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>*): `void`

*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Select.ts:273](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L273)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`> |  Object with only the changed options |

**Returns:** `void`

___

