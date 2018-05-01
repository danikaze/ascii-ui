[terminal-in-canvas](../README.md) > ["Widget"](../modules/_widget_.md) > [Widget](../classes/_widget_.widget.md)



# Class: Widget


A widget is just a self-contained graphic part of the terminal, which manages its own state.

## Hierarchy

**Widget**

↳  [Text](_widgets_text_.text.md)




↳  [Box](_widgets_box_.box.md)




↳  [Grid](_widgets_grid_.grid.md)








## Index

### Constructors

* [constructor](_widget_.widget.md#constructor)


### Properties

* [allocated](_widget_.widget.md#allocated)
* [focused](_widget_.widget.md#focused)
* [options](_widget_.widget.md#options)
* [terminal](_widget_.widget.md#terminal)


### Methods

* [blur](_widget_.widget.md#blur)
* [focus](_widget_.widget.md#focus)
* [getPosition](_widget_.widget.md#getposition)
* [getSize](_widget_.widget.md#getsize)
* [isAt](_widget_.widget.md#isat)
* [isFocused](_widget_.widget.md#isfocused)
* [render](_widget_.widget.md#render)
* [setOptions](_widget_.widget.md#setoptions)
* [updateOptions](_widget_.widget.md#updateoptions)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Widget**(terminal: *[Terminal](_terminal_.terminal.md)*, options?: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): [Widget](_widget_.widget.md)


*Defined in [Widget.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L30)*



A Widget is created in the context of a specific terminal, in a position and with a provided height


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [WidgetOptions](../interfaces/_widget_.widgetoptions.md)   |  - |





**Returns:** [Widget](_widget_.widget.md)

---


## Properties
<a id="allocated"></a>

### «Protected» allocated

**●  allocated**:  *`boolean`* 

*Defined in [Widget.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L30)*



If the widget has been allocated or not




___

<a id="focused"></a>

### «Protected» focused

**●  focused**:  *`boolean`* 

*Defined in [Widget.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L28)*



If the widget is focused or not




___

<a id="options"></a>

### «Protected» options

**●  options**:  *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)* 

*Defined in [Widget.ts:26](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L26)*



Widget options




___

<a id="terminal"></a>

### «Protected» terminal

**●  terminal**:  *[Terminal](_terminal_.terminal.md)* 

*Defined in [Widget.ts:24](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L24)*



Reference to the parent terminal where it should be rendered




___


## Methods
<a id="blur"></a>

###  blur

► **blur**(): `void`



*Defined in [Widget.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L118)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="focus"></a>

###  focus

► **focus**(): `void`



*Defined in [Widget.ts:110](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L110)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





___

<a id="getposition"></a>

###  getPosition

► **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Widget.ts:83](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L83)*



Get the position of the widget, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TerminalSize](../interfaces/_terminal_.terminalsize.md)



*Defined in [Widget.ts:71](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L71)*



Get the widget size, measured in tiles




**Returns:** [TerminalSize](../interfaces/_terminal_.terminalsize.md)
Size of the widget, measured in tiles






___

<a id="isat"></a>

###  isAt

► **isAt**(column: *`number`*, line: *`number`*): `boolean`



*Defined in [Widget.ts:97](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L97)*



Check if the widget is (overlaps) the specified position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  x-position of the terminal (in tiles) |
| line | `number`   |  y-position of the terminal (in tiles) |





**Returns:** `boolean`
`true` if the specified tile is _inside_ the widget






___

<a id="isfocused"></a>

###  isFocused

► **isFocused**(): `boolean`



*Defined in [Widget.ts:127](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L127)*



Check if the widget is currently focused or not




**Returns:** `boolean`
if the widget is focused or not.






___

<a id="render"></a>

### «Abstract» render

► **render**(): `void`



*Defined in [Widget.ts:134](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L134)*



Render the widget in the associated terminal (if any)




**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): `void`



*Defined in [Widget.ts:55](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L55)*



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



*Defined in [Widget.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L142)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changedOptions | [WidgetOptions](../interfaces/_widget_.widgetoptions.md)   |  Object with only the changed options |





**Returns:** `void`





___


