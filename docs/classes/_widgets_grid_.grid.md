[terminal-in-canvas](../README.md) > ["widgets/Grid"](../modules/_widgets_grid_.md) > [Grid](../classes/_widgets_grid_.grid.md)



# Class: Grid


Provides a dynamic grid system for Terminal Widgets

## Hierarchy


 [Widget](_widget_.widget.md)

**↳ Grid**







## Implements

* [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

## Index

### Constructors

* [constructor](_widgets_grid_.grid.md#constructor)


### Properties

* [allocated](_widgets_grid_.grid.md#allocated)
* [focused](_widgets_grid_.grid.md#focused)
* [options](_widgets_grid_.grid.md#options)
* [terminal](_widgets_grid_.grid.md#terminal)


### Methods

* [align](_widgets_grid_.grid.md#align)
* [attachWidget](_widgets_grid_.grid.md#attachwidget)
* [blur](_widgets_grid_.grid.md#blur)
* [dettachWidget](_widgets_grid_.grid.md#dettachwidget)
* [focus](_widgets_grid_.grid.md#focus)
* [getCellSize](_widgets_grid_.grid.md#getcellsize)
* [getPosition](_widgets_grid_.grid.md#getposition)
* [getSize](_widgets_grid_.grid.md#getsize)
* [getWidgetAt](_widgets_grid_.grid.md#getwidgetat)
* [getWidgetGrid](_widgets_grid_.grid.md#getwidgetgrid)
* [isAt](_widgets_grid_.grid.md#isat)
* [isFocused](_widgets_grid_.grid.md#isfocused)
* [render](_widgets_grid_.grid.md#render)
* [setOptions](_widgets_grid_.grid.md#setoptions)
* [updateOptions](_widgets_grid_.grid.md#updateoptions)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Grid**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)*): [Grid](_widgets_grid_.grid.md)


*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Grid.ts:51](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L51)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)   |  - |





**Returns:** [Grid](_widgets_grid_.grid.md)

---


## Properties
<a id="allocated"></a>

### «Protected» allocated

**●  allocated**:  *`boolean`* 

*Inherited from [Widget](_widget_.widget.md).[allocated](_widget_.widget.md#allocated)*

*Defined in [Widget.ts:30](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L30)*



If the widget has been allocated or not




___

<a id="focused"></a>

### «Protected» focused

**●  focused**:  *`boolean`* 

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L28)*



If the widget is focused or not




___

<a id="options"></a>

### «Protected» options

**●  options**:  *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)* 

*Overrides [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [widgets/Grid.ts:44](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L44)*



Grid options




___

<a id="terminal"></a>

### «Protected» terminal

**●  terminal**:  *[Terminal](_terminal_.terminal.md)* 

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:24](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L24)*



Reference to the parent terminal where it should be rendered




___


## Methods
<a id="align"></a>

###  align

► **align**(): `void`



*Defined in [widgets/Grid.ts:98](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L98)*



Do the calculation of the real size of the attached widgets Widgets won't be placed properly until this method is not called (to avoid duplicated calculations) This is called automatically when using `attachWidget` but is provided in case it needs to be called manually




**Returns:** `void`





___

<a id="attachwidget"></a>

###  attachWidget

► **attachWidget**(col: *`number`*, line: *`number`*, width: *`number`*, height: *`number`*, WidgetClass: *[Widget](_widget_.widget.md)*, ...args: *`any`[]*): [Widget](_widget_.widget.md)



*Defined in [widgets/Grid.ts:113](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L113)*



Attach a widget to the grid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  column of the grid |
| line | `number`   |  row of the grid |
| width | `number`   |  how many grid columns the widget should occupy |
| height | `number`   |  how many grid rows the widget should occupy |
| WidgetClass | [Widget](_widget_.widget.md)   |  Class of the widget to attach |
| args | `any`[]   |  - |





**Returns:** [Widget](_widget_.widget.md)
widget instance






___

<a id="blur"></a>

###  blur

► **blur**(): `void`



*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L118)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="dettachwidget"></a>

###  dettachWidget

► **dettachWidget**(widget: *[Widget](_widget_.widget.md)*): `boolean`



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[dettachWidget](../interfaces/_widgetcontainer_.widgetcontainer.md#dettachwidget)*

*Defined in [widgets/Grid.ts:136](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L136)*



Dettach a widget from this terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md)   |  - |





**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found






___

<a id="focus"></a>

###  focus

► **focus**(): `void`



*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:110](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L110)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





___

<a id="getcellsize"></a>

###  getCellSize

► **getCellSize**(column: *`number`*, line: *`number`*): [TerminalSize](../interfaces/_terminal_.terminalsize.md)



*Defined in [widgets/Grid.ts:188](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L188)*



Get the size of a cell of the grid in tiles


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the grid |
| line | `number`   |  line of the grid |





**Returns:** [TerminalSize](../interfaces/_terminal_.terminalsize.md)
size of a cell






___

<a id="getposition"></a>

###  getPosition

► **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:83](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L83)*



Get the position of the widget, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TerminalSize](../interfaces/_terminal_.terminalsize.md)



*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:71](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L71)*



Get the widget size, measured in tiles




**Returns:** [TerminalSize](../interfaces/_terminal_.terminalsize.md)
Size of the widget, measured in tiles






___

<a id="getwidgetat"></a>

###  getWidgetAt

► **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [widgets/Grid.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L156)*



Get a previously attached widget by its position in the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the terminal |
| line | `number`   |  line of the terminal |





**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found






___

<a id="getwidgetgrid"></a>

###  getWidgetGrid

► **getWidgetGrid**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Defined in [widgets/Grid.ts:172](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L172)*



Get a previously attached widget by its position in the Grid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the grid |
| line | `number`   |  line of the grid |





**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found






___

<a id="isat"></a>

###  isAt

► **isAt**(column: *`number`*, line: *`number`*): `boolean`



*Inherited from [Widget](_widget_.widget.md).[isAt](_widget_.widget.md#isat)*

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



*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:127](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L127)*



Check if the widget is currently focused or not




**Returns:** `boolean`
if the widget is focused or not.






___

<a id="render"></a>

###  render

► **render**(): `void`



*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Grid.ts:87](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L87)*



Render all the attached widgets to the grid




**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): `void`



*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

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

### «Protected» updateOptions

► **updateOptions**(changes: *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)*): `void`



*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Grid.ts:202](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L202)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)   |  - |





**Returns:** `void`





___


