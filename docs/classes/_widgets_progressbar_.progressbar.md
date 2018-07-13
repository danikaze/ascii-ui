[terminal-in-canvas](../README.md) > ["widgets/ProgressBar"](../modules/_widgets_progressbar_.md) > [ProgressBar](../classes/_widgets_progressbar_.progressbar.md)



# Class: ProgressBar


Display a progress bar

## Hierarchy


 [Widget](_widget_.widget.md)

**↳ ProgressBar**







## Index

### Constructors

* [constructor](_widgets_progressbar_.progressbar.md#constructor)


### Properties

* [allocated](_widgets_progressbar_.progressbar.md#allocated)
* [focused](_widgets_progressbar_.progressbar.md#focused)
* [options](_widgets_progressbar_.progressbar.md#options)
* [parent](_widgets_progressbar_.progressbar.md#parent)
* [terminal](_widgets_progressbar_.progressbar.md#terminal)
* [defaultOptions](_widgets_progressbar_.progressbar.md#defaultoptions)


### Methods

* [blur](_widgets_progressbar_.progressbar.md#blur)
* [focus](_widgets_progressbar_.progressbar.md#focus)
* [getParent](_widgets_progressbar_.progressbar.md#getparent)
* [getPosition](_widgets_progressbar_.progressbar.md#getposition)
* [getProgress](_widgets_progressbar_.progressbar.md#getprogress)
* [getSize](_widgets_progressbar_.progressbar.md#getsize)
* [isAt](_widgets_progressbar_.progressbar.md#isat)
* [isFocusable](_widgets_progressbar_.progressbar.md#isfocusable)
* [isFocused](_widgets_progressbar_.progressbar.md#isfocused)
* [render](_widgets_progressbar_.progressbar.md#render)
* [setOptions](_widgets_progressbar_.progressbar.md#setoptions)
* [updateOptions](_widgets_progressbar_.progressbar.md#updateoptions)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ProgressBar**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)*, parent?: *[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)*): [ProgressBar](_widgets_progressbar_.progressbar.md)


*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/ProgressBar.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L39)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)   |  - |
| parent | [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)   |  - |





**Returns:** [ProgressBar](_widgets_progressbar_.progressbar.md)

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

**●  options**:  *[ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)* 

*Overrides [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [widgets/ProgressBar.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L39)*



Options of the Text widget




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

**●  defaultOptions**:  *[ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)* 

*Overrides [Widget](_widget_.widget.md).[defaultOptions](_widget_.widget.md#defaultoptions)*

*Defined in [widgets/ProgressBar.ts:37](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L37)*



Default options for widget instances




___


## Methods
<a id="blur"></a>

###  blur

► **blur**(): `void`



*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L156)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="focus"></a>

###  focus

► **focus**(): `void`



*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Widget.ts#L142)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





___

<a id="getparent"></a>

###  getParent

► **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)



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

<a id="getprogress"></a>

###  getProgress

► **getProgress**(): `number`



*Defined in [widgets/ProgressBar.ts:63](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L63)*



Retrieve a reference to the currently selected option




**Returns:** `number`





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

*Defined in [widgets/ProgressBar.ts:52](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L52)*



Render the widget in the associated terminal




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

► **updateOptions**(options: *[ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)*): `void`



*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/ProgressBar.ts:73](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/widgets/ProgressBar.ts#L73)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)   |  - |





**Returns:** `void`





___


