[terminal-in-canvas](../README.md) > ["widgets/Text"](../modules/_widgets_text_.md) > [Text](../classes/_widgets_text_.text.md)



# Class: Text


Display formatted text in the terminal

## Hierarchy


 [Widget](_widget_.widget.md)

**↳ Text**







## Index

### Constructors

* [constructor](_widgets_text_.text.md#constructor)


### Properties

* [allocated](_widgets_text_.text.md#allocated)
* [focused](_widgets_text_.text.md#focused)
* [options](_widgets_text_.text.md#options)
* [terminal](_widgets_text_.text.md#terminal)


### Methods

* [blur](_widgets_text_.text.md#blur)
* [focus](_widgets_text_.text.md#focus)
* [getPosition](_widgets_text_.text.md#getposition)
* [getSize](_widgets_text_.text.md#getsize)
* [isAt](_widgets_text_.text.md#isat)
* [isFocused](_widgets_text_.text.md#isfocused)
* [render](_widgets_text_.text.md#render)
* [scrollLines](_widgets_text_.text.md#scrolllines)
* [scrollPages](_widgets_text_.text.md#scrollpages)
* [setOptions](_widgets_text_.text.md#setoptions)
* [setScroll](_widgets_text_.text.md#setscroll)
* [updateOptions](_widgets_text_.text.md#updateoptions)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Text**(terminal: *[Terminal](_terminal_.terminal.md)*, options: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*): [Text](_widgets_text_.text.md)


*Overrides [Widget](_widget_.widget.md).[constructor](_widget_.widget.md#constructor)*

*Defined in [widgets/Text.ts:64](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L64)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| options | [TextOptions](../interfaces/_widgets_text_.textoptions.md)   |  - |





**Returns:** [Text](_widgets_text_.text.md)

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

**●  options**:  *[TextOptions](../interfaces/_widgets_text_.textoptions.md)* 

*Overrides [Widget](_widget_.widget.md).[options](_widget_.widget.md#options)*

*Defined in [widgets/Text.ts:54](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L54)*



Options of the Text widget




___

<a id="terminal"></a>

### «Protected» terminal

**●  terminal**:  *[Terminal](_terminal_.terminal.md)* 

*Inherited from [Widget](_widget_.widget.md).[terminal](_widget_.widget.md#terminal)*

*Defined in [Widget.ts:24](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L24)*



Reference to the parent terminal where it should be rendered




___


## Methods
<a id="blur"></a>

###  blur

► **blur**(): `void`



*Inherited from [Widget](_widget_.widget.md).[blur](_widget_.widget.md#blur)*

*Defined in [Widget.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L118)*



Remove the focus from this widget. Usually done by a upper level that controls other widgets.




**Returns:** `void`





___

<a id="focus"></a>

###  focus

► **focus**(): `void`



*Inherited from [Widget](_widget_.widget.md).[focus](_widget_.widget.md#focus)*

*Defined in [Widget.ts:110](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L110)*



Set this Widget as focused. Usually done by a upper level that controls other widgets (so the previously focused widget is blurred)




**Returns:** `void`





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

*Defined in [widgets/Text.ts:74](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L74)*



Render the widget in the associated terminal




**Returns:** `void`





___

<a id="scrolllines"></a>

###  scrollLines

► **scrollLines**(lines: *`number`*): `boolean`



*Defined in [widgets/Text.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L142)*



Move the starting line of the text


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| lines | `number`   |  Number of lines to scroll the text |





**Returns:** `boolean`
`true` if there is more content after `line`, or `false` if it was the last line






___

<a id="scrollpages"></a>

###  scrollPages

► **scrollPages**(pages: *`number`*): `boolean`



*Defined in [widgets/Text.ts:152](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L152)*



Move the starting line of the text by pages


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pages | `number`   |  Number of pages to scroll |





**Returns:** `boolean`
`true` if there is more pages or `false` if it was the last one






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

<a id="setscroll"></a>

###  setScroll

► **setScroll**(line: *`number`*): `boolean`



*Defined in [widgets/Text.ts:119](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L119)*



Set the starting line of the text


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number`   |  First line to draw |





**Returns:** `boolean`
`true` if there is more content after `line`, or `false` if it was the end






___

<a id="updateoptions"></a>

### «Protected» updateOptions

► **updateOptions**(options: *[TextOptions](../interfaces/_widgets_text_.textoptions.md)*): `void`



*Overrides [Widget](_widget_.widget.md).[updateOptions](_widget_.widget.md#updateoptions)*

*Defined in [widgets/Text.ts:162](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Text.ts#L162)*



`setOptions` will assign the options to `this.options`, but any derivated calculation should be done here.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [TextOptions](../interfaces/_widgets_text_.textoptions.md)   |  - |





**Returns:** `void`





___


