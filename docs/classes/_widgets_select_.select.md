[ascii-ui API documentation](../README.md) > ["widgets/Select"](../modules/_widgets_select_.md) > [Select](../classes/_widgets_select_.select.md)

# Class: Select

Display a list of selectable options. The focused option is where the cursor is. It can be none or one at most. Selected options can be none, one or, if the `multiple` option is `true`, more than one at the same time

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
* [destruct](_widgets_select_.select.md#destruct)
* [focus](_widgets_select_.select.md#focus)
* [focusIndex](_widgets_select_.select.md#focusindex)
* [focusNext](_widgets_select_.select.md#focusnext)
* [focusOption](_widgets_select_.select.md#focusoption)
* [focusPrev](_widgets_select_.select.md#focusprev)
* [focusValue](_widgets_select_.select.md#focusvalue)
* [getFocusedIndex](_widgets_select_.select.md#getfocusedindex)
* [getFocusedOption](_widgets_select_.select.md#getfocusedoption)
* [getFocusedValue](_widgets_select_.select.md#getfocusedvalue)
* [getIndexAt](_widgets_select_.select.md#getindexat)
* [getIndexFromOption](_widgets_select_.select.md#getindexfromoption)
* [getIndexFromValue](_widgets_select_.select.md#getindexfromvalue)
* [getOptionAt](_widgets_select_.select.md#getoptionat)
* [getOptionFromIndex](_widgets_select_.select.md#getoptionfromindex)
* [getParent](_widgets_select_.select.md#getparent)
* [getPosition](_widgets_select_.select.md#getposition)
* [getSelectedIndexes](_widgets_select_.select.md#getselectedindexes)
* [getSelectedOptions](_widgets_select_.select.md#getselectedoptions)
* [getSelectedValues](_widgets_select_.select.md#getselectedvalues)
* [getSize](_widgets_select_.select.md#getsize)
* [getValueAt](_widgets_select_.select.md#getvalueat)
* [getValueFromIndex](_widgets_select_.select.md#getvaluefromindex)
* [isAt](_widgets_select_.select.md#isat)
* [isFocusable](_widgets_select_.select.md#isfocusable)
* [isFocused](_widgets_select_.select.md#isfocused)
* [isIndexSelected](_widgets_select_.select.md#isindexselected)
* [isOptionSelected](_widgets_select_.select.md#isoptionselected)
* [isValueSelected](_widgets_select_.select.md#isvalueselected)
* [render](_widgets_select_.select.md#render)
* [selectOption](_widgets_select_.select.md#selectoption)
* [selectValue](_widgets_select_.select.md#selectvalue)
* [setOptions](_widgets_select_.select.md#setoptions)
* [toggleIndex](_widgets_select_.select.md#toggleindex)
* [updateOptions](_widgets_select_.select.md#updateoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Select**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Select](_widgets_select_.select.md)

*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Select.ts:93](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L93)*

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

*Defined in [Widget.ts:39](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L39)*

If the widget has been allocated or not

___
<a id="focused"></a>

### `<Protected>` focused

**● focused**: *`boolean`*

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:37](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L37)*

If the widget is focused or not

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>* =  {} as any

*Inherited from [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [Widget.ts:35](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L35)*

Widget options

___
<a id="parent"></a>

### `<Protected>``<Optional>` parent

**● parent**: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*

*Inherited from [Widget](_widget_.widget.md).[parent](_widget_.widget.md#parent)*

*Defined in [Widget.ts:33](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L33)*

container of the widget, if any

___
<a id="terminal"></a>

### `<Protected>` terminal

**● terminal**: *[Terminal](_terminal_.terminal.md)*

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:31](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L31)*

Reference to the parent terminal where it should be rendered

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`any`>*

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Select.ts:86](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L86)*

Default options for widget instances

___

## Methods

<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:176](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L176)*

Remove the focus from this widget. Usually done by a upper level that controls other widgets.

**Returns:** `boolean`
`true` if it was focused and blurred properly

___
<a id="destruct"></a>

###  destruct

▸ **destruct**(): `void`

*Inherited from [Widget](_widget_.widget.md).[destruct](_widget_.widget.md#destruct)*

*Defined in [Widget.ts:61](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L61)*

Method to call when the widget is not going to be used anymore, so it can clean whatever it set in the constructor

**Returns:** `void`

___
<a id="focus"></a>

###  focus

▸ **focus**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:156](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L156)*

Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)

**Returns:** `boolean`
`true` if it wasn't focused and focused properly

___
<a id="focusindex"></a>

###  focusIndex

▸ **focusIndex**(index: *`number`*): `boolean`

*Defined in [widgets/Select.ts:416](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L416)*

Focus the option with the specified index. This will do nothing if the option is already focused or the index is invalid. The list will scroll to show the focused option if needed.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  New index to set as selected (starting on 0) |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="focusnext"></a>

###  focusNext

▸ **focusNext**(): `boolean`

*Defined in [widgets/Select.ts:483](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L483)*

Select the next option to the current one

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="focusoption"></a>

###  focusOption

▸ **focusOption**(option: *[SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>*): `boolean`

*Defined in [widgets/Select.ts:453](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L453)*

Focus the the specified option This will do nothing if the option is already focused or not found The list will scroll to show the focused option if needed.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| option | [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`> |  Option to focus |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="focusprev"></a>

###  focusPrev

▸ **focusPrev**(): `boolean`

*Defined in [widgets/Select.ts:474](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L474)*

Focus the previous option to the current one

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="focusvalue"></a>

###  focusValue

▸ **focusValue**(value: *`T`*): `boolean`

*Defined in [widgets/Select.ts:465](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L465)*

Focus the option with the specified value This will do nothing if the option is already focused or not found The list will scroll to show the focused option if needed.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  Value to set as selected |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="getfocusedindex"></a>

###  getFocusedIndex

▸ **getFocusedIndex**(): `number`

*Defined in [widgets/Select.ts:245](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L245)*

Retrieve the index of the focused option

**Returns:** `number`
index of the selected option or `UNSELECTED_INDEX` if no one is selected

___
<a id="getfocusedoption"></a>

###  getFocusedOption

▸ **getFocusedOption**(): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>

*Defined in [widgets/Select.ts:254](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L254)*

Retrieve the focused option

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>
Reference to the given focused option, or `undefined` if nothing is selected

___
<a id="getfocusedvalue"></a>

###  getFocusedValue

▸ **getFocusedValue**(): `T`

*Defined in [widgets/Select.ts:263](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L263)*

Retrieve the value of the focused option

**Returns:** `T`
Reference to the given focused option value, or `undefined` if nothing is selected

___
<a id="getindexat"></a>

###  getIndexAt

▸ **getIndexAt**(column: *`number`*, line: *`number`*): `number`

*Defined in [widgets/Select.ts:274](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L274)*

Get the index of the option at the specified terminal position (absolute)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** `number`
index of the option or `INDEX_NONE` if not found

___
<a id="getindexfromoption"></a>

###  getIndexFromOption

▸ **getIndexFromOption**(option: *[SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>*): `number`

*Defined in [widgets/Select.ts:177](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L177)*

Get the index of the desired option

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| option | [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`> |  option to search |

**Returns:** `number`
Index of the option in the select list or `INDEX_NONE` if not found

___
<a id="getindexfromvalue"></a>

###  getIndexFromValue

▸ **getIndexFromValue**(value: *`T`*): `number`

*Defined in [widgets/Select.ts:193](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L193)*

Get the index of the desired value

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  value to search |

**Returns:** `number`
Index of the option in the select list or `INDEX_NONE` if not found

___
<a id="getoptionat"></a>

###  getOptionAt

▸ **getOptionAt**(column: *`number`*, line: *`number`*): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>

*Defined in [widgets/Select.ts:299](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L299)*

Get the option at the specified terminal position (absolute)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>
option or `undefined` if not found

___
<a id="getoptionfromindex"></a>

###  getOptionFromIndex

▸ **getOptionFromIndex**(index: *`number`*): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>

*Defined in [widgets/Select.ts:153](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L153)*

Get the provided option from the specified index

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  index of the desired option |

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>
Reference to a copy of the provided option

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Inherited from [Widget](_widget_.widget.md).[getParent](_widget_.widget.md#getparent)*

*Defined in [Widget.ts:70](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L70)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getposition"></a>

###  getPosition

▸ **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:118](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L118)*

Get the position of the widget, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates

___
<a id="getselectedindexes"></a>

###  getSelectedIndexes

▸ **getSelectedIndexes**(): `number`[]

*Defined in [widgets/Select.ts:208](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L208)*

Retrieve a list of indexes of the selected options.

**Returns:** `number`[]
Indexes of the selected options

___
<a id="getselectedoptions"></a>

###  getSelectedOptions

▸ **getSelectedOptions**(): [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>[]

*Defined in [widgets/Select.ts:227](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L227)*

Retrieve a list of selected options. Even if this is a list of references to the given options, refrain of modifying them directly. Use `setOptions` instead.

**Returns:** [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>[]
List of selected options

___
<a id="getselectedvalues"></a>

###  getSelectedValues

▸ **getSelectedValues**(): `T`[]

*Defined in [widgets/Select.ts:236](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L236)*

Retrieve a list of selected values.

**Returns:** `T`[]
List of selected values

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:106](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L106)*

Get the widget size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles

___
<a id="getvalueat"></a>

###  getValueAt

▸ **getValueAt**(column: *`number`*, line: *`number`*): `T`

*Defined in [widgets/Select.ts:310](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L310)*

Get the value of the option at the specified terminal position (absolute)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** `T`
option value or `undefined` if not found

___
<a id="getvaluefromindex"></a>

###  getValueFromIndex

▸ **getValueFromIndex**(index: *`number`*): `T`

*Defined in [widgets/Select.ts:165](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L165)*

Get the provided value from the specified index

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  index of the desired option |

**Returns:** `T`
Reference to a copy of the provided value

___
<a id="isat"></a>

###  isAt

▸ **isAt**(column: *`number`*, line: *`number`*): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isAt](_widget_.widget.md#isat)*

*Defined in [Widget.ts:132](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L132)*

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

*Defined in [Widget.ts:146](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L146)*

Check if this widget is focusable (when cycling over widgets)

**Returns:** `boolean`
`true` if focusable, `false` if not

___
<a id="isfocused"></a>

###  isFocused

▸ **isFocused**(): `boolean`

*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:191](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L191)*

Check if the widget is currently focused or not

**Returns:** `boolean`
if the widget is focused or not.

___
<a id="isindexselected"></a>

###  isIndexSelected

▸ **isIndexSelected**(index: *`number`*): `boolean`

*Defined in [widgets/Select.ts:320](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L320)*

Check if the option with the specified index is selected or not

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  index of the option to check |

**Returns:** `boolean`
`true` if selected, `false` if not. `undefined` if the option is not found

___
<a id="isoptionselected"></a>

###  isOptionSelected

▸ **isOptionSelected**(option: *[SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>*): `boolean`

*Defined in [widgets/Select.ts:332](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L332)*

Check if an option is selected or not

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| option | [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`> |  option to check |

**Returns:** `boolean`
`true` if selected, `false` if not. `undefined` if the option is not found

___
<a id="isvalueselected"></a>

###  isValueSelected

▸ **isValueSelected**(value: *`T`*): `boolean`

*Defined in [widgets/Select.ts:344](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L344)*

Check if the option with the specified value is selected or not

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  value to check |

**Returns:** `boolean`
`true` if selected, `false` if not. `undefined` if the option is not found

___
<a id="render"></a>

###  render

▸ **render**(): `void`

*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Select.ts:108](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L108)*

Render the widget in the associated terminal

**Returns:** `void`

___
<a id="selectoption"></a>

###  selectOption

▸ **selectOption**(option: *[SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`>*): `boolean`

*Defined in [widgets/Select.ts:393](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L393)*

Select the first option with the specified. This will do nothing if all the options with that value are disabled

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| option | [SelectOption](../interfaces/_widgets_select_.selectoption.md)<`T`> |  Value to search the option by |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="selectvalue"></a>

###  selectValue

▸ **selectValue**(value: *`T`*): `boolean`

*Defined in [widgets/Select.ts:404](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L404)*

Select the first option with the specified value. This will do nothing if all the options with that value are disabled

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

*Defined in [Widget.ts:86](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L86)*

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
<a id="toggleindex"></a>

###  toggleIndex

▸ **toggleIndex**(index: *`number`*, selected?: *`boolean`*): `boolean`

*Defined in [widgets/Select.ts:362](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L362)*

Select the option with the specified index. This will do nothing if the option is disabled or the index is invalid. If `options.multiple` is `false`, then it will unselect any previously selected option. The list won't focus the option and therefore, the scroll won't change.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  New index to set as selected (starting on 0) |
| `Optional` selected | `boolean` |  If \`true\` the option will be set as selected. If \`false\`, the option will be set as unselected. If \`undefined\`, the option will be negated (selected -> unselected / unselected -> selected) |

**Returns:** `boolean`
`true` if the selected option has changed, `false` otherwise

___
<a id="updateoptions"></a>

### `<Protected>` updateOptions

▸ **updateOptions**(changes: *[SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`>*): `void`

*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Select.ts:493](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L493)*

`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)<`T`> |  Object with only the changed options |

**Returns:** `void`

___

