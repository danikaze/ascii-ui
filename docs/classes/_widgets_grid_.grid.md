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
* [parent](_widgets_grid_.grid.md#parent)
* [terminal](_widgets_grid_.grid.md#terminal)
* [defaultOptions](_widgets_grid_.grid.md#defaultoptions)


### Methods

* [__@iterator](_widgets_grid_.grid.md#___iterator)
* [align](_widgets_grid_.grid.md#align)
* [attachWidget](_widgets_grid_.grid.md#attachwidget)
* [blur](_widgets_grid_.grid.md#blur)
* [dettachWidget](_widgets_grid_.grid.md#dettachwidget)
* [focus](_widgets_grid_.grid.md#focus)
* [getCellSize](_widgets_grid_.grid.md#getcellsize)
* [getParent](_widgets_grid_.grid.md#getparent)
* [getPosition](_widgets_grid_.grid.md#getposition)
* [getSize](_widgets_grid_.grid.md#getsize)
* [getWidgetAt](_widgets_grid_.grid.md#getwidgetat)
* [getWidgetGrid](_widgets_grid_.grid.md#getwidgetgrid)
* [isAt](_widgets_grid_.grid.md#isat)
* [isFocusable](_widgets_grid_.grid.md#isfocusable)
* [isFocused](_widgets_grid_.grid.md#isfocused)
* [render](_widgets_grid_.grid.md#render)
* [setOptions](_widgets_grid_.grid.md#setoptions)
* [updateOptions](_widgets_grid_.grid.md#updateoptions)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Grid**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [Grid](_widgets_grid_.grid.md)


*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Grid.ts:54](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)   |  - |
| parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)   |  - |





**Returns:** [Grid](_widgets_grid_.grid.md)

---


## Properties
<a id="allocated"></a>

### «Protected» allocated

**●  allocated**:  *`boolean`* 

*Inherited from [Widget](_widget_.widget.md).[allocated](_widget_.widget.md#allocated)*

*Defined in [Widget.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L35)*



If the widget has been allocated or not




___

<a id="focused"></a>

### «Protected» focused

**●  focused**:  *`boolean`* 

*Inherited from [Widget](_widget_.widget.md).[focused](_widget_.widget.md#focused)*

*Defined in [Widget.ts:33](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L33)*



If the widget is focused or not




___

<a id="options"></a>

### «Protected» options

**●  options**:  *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)* 

*Overrides [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [widgets/Grid.ts:47](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L47)*



Grid options




___

<a id="parent"></a>

### «Protected»«Optional» parent

**●  parent**:  *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)* 

*Inherited from [Widget](_widget_.widget.md).[parent](_widget_.widget.md#parent)*

*Defined in [Widget.ts:29](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L29)*



container of the widget, if any




___

<a id="terminal"></a>

### «Protected» terminal

**●  terminal**:  *[Terminal](_terminal_.terminal.md)* 

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:27](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L27)*



Reference to the parent terminal where it should be rendered




___

<a id="defaultoptions"></a>

### «Static» defaultOptions

**●  defaultOptions**:  *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)* 

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/Grid.ts:42](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L42)*



Default options for widget instances




___


## Methods
<a id="___iterator"></a>

###  __@iterator

► **__@iterator**(startWidget?: *[Widget](_widget_.widget.md)⎮`number`*): [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)[Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[__@iterator](../interfaces/_widgetcontainer_.widgetcontainer.md#___iterator)*

*Defined in [widgets/Grid.ts:178](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L178)*



Get a bidirectional iterator to move across the attached widgets of the container


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| startWidget | [Widget](_widget_.widget.md)⎮`number`   |  if specified, the iterator will start with this widget |





**Returns:** [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)[Widget](_widget_.widget.md)





___

<a id="align"></a>

###  align

► **align**(): `void`



*Defined in [widgets/Grid.ts:100](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L100)*



Do the calculation of the real size of the attached widgets Widgets won't be placed properly until this method is not called (to avoid duplicated calculations) This is called automatically when using `attachWidget` but is provided in case it needs to be called manually




**Returns:** `void`





___

<a id="attachwidget"></a>

###  attachWidget

► **attachWidget**(col: *`number`*, line: *`number`*, width: *`number`*, height: *`number`*, WidgetClass: *[Widget](_widget_.widget.md)*, options: *`any`*): [Widget](_widget_.widget.md)



*Defined in [widgets/Grid.ts:115](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L115)*



Attach a widget to the grid


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  column of the grid |
| line | `number`   |  row of the grid |
| width | `number`   |  how many grid columns the widget should occupy |
| height | `number`   |  how many grid rows the widget should occupy |
| WidgetClass | [Widget](_widget_.widget.md)   |  Class of the widget to attach |
| options | `any`   |  Options to pass to the Widget when creating it |





**Returns:** [Widget](_widget_.widget.md)
widget instance






___

<a id="blur"></a>

###  blur

► **blur**(): `void`



*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L156)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="dettachwidget"></a>

###  dettachWidget

► **dettachWidget**(widget: *[Widget](_widget_.widget.md)*): `boolean`



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[dettachWidget](../interfaces/_widgetcontainer_.widgetcontainer.md#dettachwidget)*

*Defined in [widgets/Grid.ts:143](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L143)*



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

*Defined in [Widget.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L142)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





___

<a id="getcellsize"></a>

###  getCellSize

► **getCellSize**(column: *`number`*, line: *`number`*): [TileSize](../interfaces/_terminal_.tilesize.md)



*Defined in [widgets/Grid.ts:246](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L246)*



Get the size of a cell of the grid in tiles


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the grid |
| line | `number`   |  line of the grid |





**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
size of a cell






___

<a id="getparent"></a>

###  getParent

► **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getParent](../interfaces/_widgetcontainer_.widgetcontainer.md#getparent)*

*Inherited from [Widget](_widget_.widget.md).[getParent](_widget_.widget.md#getparent)*

*Defined in [Widget.ts:58](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L58)*



Get the reference to the parent of the widget, if any




**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`






___

<a id="getposition"></a>

###  getPosition

► **getPosition**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Inherited from [Widget](_widget_.widget.md).[getPosition](_widget_.widget.md#getposition)*

*Defined in [Widget.ts:106](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L106)*



Get the position of the widget, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the widget, in tile coordinates






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)



*Inherited from [Widget](_widget_.widget.md).[getSize](_widget_.widget.md#getsize)*

*Defined in [Widget.ts:94](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L94)*



Get the widget size, measured in tiles




**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the widget, measured in tiles






___

<a id="getwidgetat"></a>

###  getWidgetAt

► **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [widgets/Grid.ts:163](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L163)*



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



*Defined in [widgets/Grid.ts:230](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L230)*



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



*Inherited from [Widget](_widget_.widget.md).[isFocusable](_widget_.widget.md#isfocusable)*

*Defined in [Widget.ts:134](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L134)*



Check if this widget is focusable (when cycling over widgets)




**Returns:** `boolean`
`true` if focusable, `false` if not






___

<a id="isfocused"></a>

###  isFocused

► **isFocused**(): `boolean`



*Inherited from [Widget](_widget_.widget.md).[isFocused](_widget_.widget.md#isfocused)*

*Defined in [Widget.ts:169](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L169)*



Check if the widget is currently focused or not




**Returns:** `boolean`
if the widget is focused or not.






___

<a id="render"></a>

###  render

► **render**(): `void`



*Overrides [Widget](_widget_.widget.md).[render](_widget_.widget.md#render)*

*Defined in [widgets/Grid.ts:89](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L89)*



Render all the attached widgets to the grid




**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[WidgetOptions](../interfaces/_widget_.widgetoptions.md)*): `void`



*Inherited from [Widget](_widget_.widget.md).[setOptions](_widget_.widget.md#setoptions)*

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

### «Protected» updateOptions

► **updateOptions**(changes: *[GridOptions](../interfaces/_widgets_grid_.gridoptions.md)*): `void`



*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Grid.ts:260](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/Grid.ts#L260)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)   |  - |





**Returns:** `void`





___


