[terminal-in-canvas](../README.md) > ["Widget"](../modules/_widget_.md) > [Widget](../classes/_widget_.widget.md)



# Class: Widget


A widget is just a self-contained graphic part of the terminal, which manages its own state.

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


### ⊕ **new Widget**(terminal: *[Terminal](_terminal_.terminal.md)*, options?: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Widget](_widget_.widget.md)


*Defined in [Widget.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L35)*



A Widget is created in the context of a specific terminal, in a position and with a provided height


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [WidgetOptions](../interfaces/_widget_.widgetoptions.md)   |  - |
| parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)   |  - |





**Returns:** [Widget](_widget_.widget.md)

---


## Properties
<a id="allocated"></a>

### «Protected» allocated

**●  allocated**:  *`boolean`* 

*Defined in [Widget.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L35)*



If the widget has been allocated or not




___

<a id="focused"></a>

### «Protected» focused

**●  focused**:  *`boolean`* 

*Defined in [Widget.ts:33](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L33)*



If the widget is focused or not




___

<a id="options"></a>

### «Protected» options

**●  options**:  *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)* 

*Defined in [Widget.ts:31](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L31)*



Widget options




___

<a id="parent"></a>

### «Protected»«Optional» parent

**●  parent**:  *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)* 

*Defined in [Widget.ts:29](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L29)*



container of the widget, if any




___

<a id="terminal"></a>

### «Protected» terminal

**●  terminal**:  *[Terminal](_terminal_.terminal.md)* 

*Defined in [Widget.ts:27](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L27)*



Reference to the parent terminal where it should be rendered




___

<a id="defaultoptions"></a>

### «Static» defaultOptions

**●  defaultOptions**:  *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)* 

*Defined in [Widget.ts:25](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L25)*



Default options for widget instances




___


## Methods
<a id="blur"></a>

###  blur

► **blur**(): `void`



*Defined in [Widget.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L156)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="focus"></a>

###  focus

► **focus**(): `void`



*Defined in [Widget.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L142)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





___

<a id="getparent"></a>

###  getParent

► **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)



*Defined in [Widget.ts:58](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L58)*



Get the reference to the parent of the widget, if any




**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`






___

<a id="getposition"></a>

###  getPosition

► **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Widget.ts:106](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L106)*



Get the position of the widget, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)



*Defined in [Widget.ts:94](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L94)*



Get the widget size, measured in tiles




**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles






___

<a id="isat"></a>

###  isAt

► **isAt**(column: *`number`*, line: *`number`*): `boolean`



*Defined in [Widget.ts:120](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L120)*



Check if the widget is (overlaps) the specified position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  x-position of the terminal (in tiles) |
| line | `number`   |  y-position of the terminal (in tiles) |





**Returns:** `boolean`
`true` if the specified tile is _inside_ the widget






___

<a id="isfocusable"></a>

###  isFocusable

► **isFocusable**(): `boolean`



*Defined in [Widget.ts:134](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L134)*



Check if this widget is focusable (when cycling over widgets)




**Returns:** `boolean`
`true` if focusable, `false` if not






___

<a id="isfocused"></a>

###  isFocused

► **isFocused**(): `boolean`



*Defined in [Widget.ts:169](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L169)*



Check if the widget is currently focused or not




**Returns:** `boolean`
if the widget is focused or not.






___

<a id="render"></a>

### «Abstract» render

► **render**(): `void`



*Defined in [Widget.ts:176](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L176)*



Render the widget in the associated terminal (if any)




**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): `void`



*Defined in [Widget.ts:74](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L74)*



Update the options. Always use this setter so the widget knows about the change instead of changing the (protected) variable directly. The widget might do some internal calcs when this method is called.

Do not reimplement this setter in any subclass, but implement `updateOptions`
*__final__*: 

*__see__*: updateOptions



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [WidgetOptions](../interfaces/_widget_.widgetoptions.md)   |  Options to change. |





**Returns:** `void`





___

<a id="updateoptions"></a>

### «Protected»«Abstract» updateOptions

► **updateOptions**(changedOptions: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): `void`



*Defined in [Widget.ts:184](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L184)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changedOptions | [WidgetOptions](../interfaces/_widget_.widgetoptions.md)   |  Object with only the changed options |





**Returns:** `void`





___


