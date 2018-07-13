[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [Terminal](../classes/_terminal_.terminal.md)



# Class: Terminal


Basic terminal features rendered into a Canvas object

## Implements

* [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

## Index

### Constructors

* [constructor](_terminal_.terminal.md#constructor)


### Properties

* [eventManager](_terminal_.terminal.md#eventmanager)
* [focusManager](_terminal_.terminal.md#focusmanager)
* [options](_terminal_.terminal.md#options)
* [defaultOptions](_terminal_.terminal.md#defaultoptions)


### Methods

* [__@iterator](_terminal_.terminal.md#___iterator)
* [attachWidget](_terminal_.terminal.md#attachwidget)
* [clear](_terminal_.terminal.md#clear)
* [dettachWidget](_terminal_.terminal.md#dettachwidget)
* [getCursor](_terminal_.terminal.md#getcursor)
* [getLeafWidgetAt](_terminal_.terminal.md#getleafwidgetat)
* [getParent](_terminal_.terminal.md#getparent)
* [getSize](_terminal_.terminal.md#getsize)
* [getText](_terminal_.terminal.md#gettext)
* [getTextStyle](_terminal_.terminal.md#gettextstyle)
* [getTilePosition](_terminal_.terminal.md#gettileposition)
* [getViewport](_terminal_.terminal.md#getviewport)
* [getWidgetAt](_terminal_.terminal.md#getwidgetat)
* [getWidgetPath](_terminal_.terminal.md#getwidgetpath)
* [isCursorEnabled](_terminal_.terminal.md#iscursorenabled)
* [moveCursor](_terminal_.terminal.md#movecursor)
* [render](_terminal_.terminal.md#render)
* [renderAll](_terminal_.terminal.md#renderall)
* [setCursor](_terminal_.terminal.md#setcursor)
* [setOptions](_terminal_.terminal.md#setoptions)
* [setText](_terminal_.terminal.md#settext)
* [setTextStyle](_terminal_.terminal.md#settextstyle)
* [setTiles](_terminal_.terminal.md#settiles)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Terminal**(canvas: *`HTMLCanvasElement`*, options?: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): [Terminal](_terminal_.terminal.md)


*Defined in [Terminal.ts:152](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L152)*



Creates a Terminal associated to a canvas element.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| canvas | `HTMLCanvasElement`   |  `<canvas>` element associated to the Terminal |
| options | [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)   |  - |





**Returns:** [Terminal](_terminal_.terminal.md)

---


## Properties
<a id="eventmanager"></a>

###  eventManager

**●  eventManager**:  *[EventManager](_eventmanager_.eventmanager.md)* 

*Defined in [Terminal.ts:124](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L124)*



event manager for this terminal




___

<a id="focusmanager"></a>

###  focusManager

**●  focusManager**:  *[FocusManager](_focusmanager_.focusmanager.md)* 

*Defined in [Terminal.ts:122](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L122)*



focus manager for the Terminal widgets




___

<a id="options"></a>

### «Protected» options

**●  options**:  *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)* 

*Defined in [Terminal.ts:126](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L126)*



terminal options




___

<a id="defaultoptions"></a>

### «Static» defaultOptions

**●  defaultOptions**:  *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)* 

*Defined in [Terminal.ts:120](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L120)*



Default options for widget instances




___


## Methods
<a id="___iterator"></a>

###  __@iterator

► **__@iterator**(startWidget?: *[Widget](_widget_.widget.md)⎮`number`*): [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)[Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[__@iterator](../interfaces/_widgetcontainer_.widgetcontainer.md#___iterator)*

*Defined in [Terminal.ts:757](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L757)*



Get a bidirectional iterator to move across the attached widgets of the container


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| startWidget | [Widget](_widget_.widget.md)⎮`number`   |  if specified, the next call will start with this widget (return the next or previous one) |





**Returns:** [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)[Widget](_widget_.widget.md)





___

<a id="attachwidget"></a>

###  attachWidget

► **attachWidget**(WidgetClass: *[Widget](_widget_.widget.md)*, options?: *`any`*): [Widget](_widget_.widget.md)



*Defined in [Terminal.ts:660](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L660)*



Create and attach a widget to this instance of the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| WidgetClass | [Widget](_widget_.widget.md)   |  Class of the widget |
| options | `any`   |  Options for the widget constructor |





**Returns:** [Widget](_widget_.widget.md)
handler of the attached widget. Required to deattach it.






___

<a id="clear"></a>

###  clear

► **clear**(): `void`

► **clear**(col: *`number`*, line: *`number`*, width: *`number`*, height: *`number`*): `any`



*Defined in [Terminal.ts:220](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L220)*



Clear the whole terminal




**Returns:** `void`



*Defined in [Terminal.ts:230](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L230)*



Clear only the specified part of the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  - |
| line | `number`   |  - |
| width | `number`   |  - |
| height | `number`   |  - |





**Returns:** `any`





___

<a id="dettachwidget"></a>

###  dettachWidget

► **dettachWidget**(widget: *[Widget](_widget_.widget.md)*): `boolean`



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[dettachWidget](../interfaces/_widgetcontainer_.widgetcontainer.md#dettachwidget)*

*Defined in [Terminal.ts:679](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L679)*



Dettach a widget from the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md)   |  Widget to dettach |





**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found






___

<a id="getcursor"></a>

###  getCursor

► **getCursor**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:397](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L397)*



Get the position of the cursor, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the cursor, in tile coordinates






___

<a id="getleafwidgetat"></a>

###  getLeafWidgetAt

► **getLeafWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Defined in [Terminal.ts:716](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L716)*



Traverse the containers to get the last possible widget at the specified position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the terminal |
| line | `number`   |  line of the terminal |





**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found






___

<a id="getparent"></a>

###  getParent

► **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getParent](../interfaces/_widgetcontainer_.widgetcontainer.md#getparent)*

*Defined in [Terminal.ts:649](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L649)*



Get the reference to the parent of the widget, if any




**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)



*Defined in [Terminal.ts:376](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L376)*



Get the terminal size, measured in tiles




**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the terminal, measured in tiles






___

<a id="gettext"></a>

###  getText

► **getText**(size?: *`number`*, col?: *`number`*, line?: *`number`*): `string`



*Defined in [Terminal.ts:594](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L594)*



Get the text of the terminal. By default gets the text from the current position of the cursor. If the `size` is reaches the end of the line, it will continue in the next one.


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| size | `number`  | 1 |   Number of tiles to get |
| col | `number`  | - |   x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`  | - |   y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `string`





___

<a id="gettextstyle"></a>

###  getTextStyle

► **getTextStyle**(): [CharStyle](../interfaces/_terminal_.charstyle.md)



*Defined in [Terminal.ts:481](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L481)*



Get the current style being applied to the `setText` calls




**Returns:** [CharStyle](../interfaces/_terminal_.charstyle.md)





___

<a id="gettileposition"></a>

###  getTilePosition

► **getTilePosition**(x: *`number`*, y: *`number`*): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:460](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L460)*



Given a position in pixels relative to the top-left corner of the terminal, get the corresponding tile


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | `number`   |  pixels from the left corner in the grid |
| y | `number`   |  pixels from the top corner in the grid |





**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)





___

<a id="getviewport"></a>

###  getViewport

► **getViewport**(): [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)



*Defined in [Terminal.ts:367](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L367)*



Get the drawing limits (viewport) of the terminal




**Returns:** [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)
Current viewport of the terminal






___

<a id="getwidgetat"></a>

###  getWidgetAt

► **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [Terminal.ts:699](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L699)*



Get a previously attached widget by its position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the terminal |
| line | `number`   |  line of the terminal |





**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found (wrong id or previously dettached)






___

<a id="getwidgetpath"></a>

###  getWidgetPath

► **getWidgetPath**(widget: *[Widget](_widget_.widget.md)*): `Array`.<[Widget](_widget_.widget.md)⎮[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)>



*Defined in [Terminal.ts:740](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L740)*



Get the list of widgets from the widget until the terminal itself (not included) The result will be `undefined` if the widget is not found as a descendant of this terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md)   |  Widget to start the list with |





**Returns:** `Array`.<[Widget](_widget_.widget.md)⎮[WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)>
list of widgets from the `widget` itself (included) to the terminal (not included)






___

<a id="iscursorenabled"></a>

###  isCursorEnabled

► **isCursorEnabled**(): `boolean`



*Defined in [Terminal.ts:388](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L388)*



Get the current status of the cursor




**Returns:** `boolean`
`true` if the cursor is enabled, `false` otherwise






___

<a id="movecursor"></a>

###  moveCursor

► **moveCursor**(dx: *`number`*, dy: *`number`*): `void`



*Defined in [Terminal.ts:449](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L449)*



Set the new position of the cursor, relative to the current one


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dx | `number`   |  - |
| dy | `number`   |  - |





**Returns:** `void`





___

<a id="render"></a>

###  render

► **render**(): `void`



*Defined in [Terminal.ts:277](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L277)*



Render the terminal status into the canvas context. It works with a list of _dirty_ tiles so it only renders what's changed.

It's called automatically if `options.autoRender` is `true` (recommended), but can be set to `false` and call this method manually from outside.




**Returns:** `void`





___

<a id="renderall"></a>

###  renderAll

► **renderAll**(): `void`



*Defined in [Terminal.ts:352](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L352)*



Forces a render of all the tiles, not only the changed ones




**Returns:** `void`





___

<a id="setcursor"></a>

###  setCursor

► **setCursor**(col: *`number`*, line: *`number`*): `void`



*Defined in [Terminal.ts:410](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L410)*



Set the new position of the cursor


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  x-coordinate of the tile in the grid |
| line | `number`   |  y-coordinate of the tile in the grid |





**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): `void`



*Defined in [Terminal.ts:180](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L180)*



Update the values of the Terminal options


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)   |  new options to set |





**Returns:** `void`





___

<a id="settext"></a>

###  setText

► **setText**(text: *`string`*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:504](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L504)*



Input a simple text in the terminal. By default the text will be set in the current position of the cursor. If the text reaches the right side of the terminal, will break into a new line as is (there's no word begin-end control when breaking a word). There's no character escape done (such as \n)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  text to set in the given position |
| col | `number`   |  x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`   |  y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `void`





___

<a id="settextstyle"></a>

###  setTextStyle

► **setTextStyle**(style: *[CharStyle](../interfaces/_terminal_.charstyle.md)*): `void`



*Defined in [Terminal.ts:474](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L474)*



Set the style to apply in the `setText` calls. Passed `style` object can have other properties, but only the ones related to the style will be applied.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| style | [CharStyle](../interfaces/_terminal_.charstyle.md)   |  new style to set for future text |





**Returns:** `void`





___

<a id="settiles"></a>

###  setTiles

► **setTiles**(tiles: *[Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:621](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L621)*



Works like `setText` but specifying all the properties of a tile, not only the text.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tiles | [Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]   |  Tile or list of tiles to set |
| col | `number`   |  x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`   |  y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `void`





___


