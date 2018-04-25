[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [Terminal](../classes/_terminal_.terminal.md)



# Class: Terminal


Basic terminal features rendered into a Canvas object

## Implements

* [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

## Index

### Constructors

* [constructor](_terminal_.terminal.md#constructor)


### Properties

* [options](_terminal_.terminal.md#options)


### Methods

* [attachWidget](_terminal_.terminal.md#attachwidget)
* [clear](_terminal_.terminal.md#clear)
* [dettachWidget](_terminal_.terminal.md#dettachwidget)
* [getCursor](_terminal_.terminal.md#getcursor)
* [getSize](_terminal_.terminal.md#getsize)
* [getText](_terminal_.terminal.md#gettext)
* [getTextStyle](_terminal_.terminal.md#gettextstyle)
* [getTilePosition](_terminal_.terminal.md#gettileposition)
* [getViewport](_terminal_.terminal.md#getviewport)
* [getWidgetAt](_terminal_.terminal.md#getwidgetat)
* [listen](_terminal_.terminal.md#listen)
* [moveCursor](_terminal_.terminal.md#movecursor)
* [render](_terminal_.terminal.md#render)
* [renderAll](_terminal_.terminal.md#renderall)
* [setCursor](_terminal_.terminal.md#setcursor)
* [setDebug](_terminal_.terminal.md#setdebug)
* [setOptions](_terminal_.terminal.md#setoptions)
* [setText](_terminal_.terminal.md#settext)
* [setTextStyle](_terminal_.terminal.md#settextstyle)
* [setTiles](_terminal_.terminal.md#settiles)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Terminal**(canvas: *`HTMLCanvasElement`*, options?: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): [Terminal](_terminal_.terminal.md)


*Defined in [Terminal.ts:166](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L166)*



Creates a Terminal associated to a canvas element.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| canvas | `HTMLCanvasElement`   |  `<canvas>` element associated to the Terminal |
| options | [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)   |  - |





**Returns:** [Terminal](_terminal_.terminal.md)

---


## Properties
<a id="options"></a>

### «Protected» options

**●  options**:  *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)* 

*Defined in [Terminal.ts:138](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L138)*



terminal options




___


## Methods
<a id="attachwidget"></a>

###  attachWidget

► **attachWidget**(widget: *[Widget](_widget_.widget.md)*): [Widget](_widget_.widget.md)

► **attachWidget**(WidgetClass: *[Widget](_widget_.widget.md)*, ...args: *`any`[]*): [Widget](_widget_.widget.md)



*Defined in [Terminal.ts:682](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L682)*



Attach a specified widget to this instance of the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md)   |  instance of the widget to attach |





**Returns:** [Widget](_widget_.widget.md)
widget instance




*Defined in [Terminal.ts:691](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L691)*



Create and attach a widget to this instance of the terminal


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| WidgetClass | [Widget](_widget_.widget.md)   |  Class of the widget |
| args | `any`[]   |  Options for the widget constructor |





**Returns:** [Widget](_widget_.widget.md)
handler of the attached widget. Required to deattach it.






___

<a id="clear"></a>

###  clear

► **clear**(): `void`

► **clear**(col: *`number`*, line: *`number`*, width: *`number`*, height: *`number`*): `any`



*Defined in [Terminal.ts:257](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L257)*



Clear the whole terminal




**Returns:** `void`



*Defined in [Terminal.ts:267](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L267)*



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

*Defined in [Terminal.ts:710](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L710)*



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



*Defined in [Terminal.ts:430](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L430)*



Get the position of the cursor, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the cursor, in tile coordinates






___

<a id="getsize"></a>

###  getSize

► **getSize**(): [TerminalSize](../interfaces/_terminal_.terminalsize.md)



*Defined in [Terminal.ts:418](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L418)*



Get the terminal size, measured in tiles




**Returns:** [TerminalSize](../interfaces/_terminal_.terminalsize.md)
Size of the terminal, measured in tiles






___

<a id="gettext"></a>

###  getText

► **getText**(size?: *`number`*, col?: *`number`*, line?: *`number`*): `string`



*Defined in [Terminal.ts:627](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L627)*



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



*Defined in [Terminal.ts:514](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L514)*



Get the current style being applied to the `setText` calls




**Returns:** [CharStyle](../interfaces/_terminal_.charstyle.md)





___

<a id="gettileposition"></a>

###  getTilePosition

► **getTilePosition**(x: *`number`*, y: *`number`*): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:493](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L493)*



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



*Defined in [Terminal.ts:409](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L409)*



Get the drawing limits (viewport) of the terminal




**Returns:** [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)
Current viewport of the terminal






___

<a id="getwidgetat"></a>

###  getWidgetAt

► **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)



*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [Terminal.ts:730](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L730)*



Get a previously attached widget by its position


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number`   |  column of the terminal |
| line | `number`   |  line of the terminal |





**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found (wrong id or previously dettached)






___

<a id="listen"></a>

###  listen

► **listen**(event: *[TerminalEvent](../enums/_terminal_.terminalevent.md)*, listener: *[EventListener](../modules/_terminal_.md#eventlistener)*): `void`



*Defined in [Terminal.ts:746](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L746)*



Register a listener to a specific event


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | [TerminalEvent](../enums/_terminal_.terminalevent.md)   |  event to listen |
| listener | [EventListener](../modules/_terminal_.md#eventlistener)   |  callback to register |





**Returns:** `void`





___

<a id="movecursor"></a>

###  moveCursor

► **moveCursor**(dx: *`number`*, dy: *`number`*): `void`



*Defined in [Terminal.ts:482](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L482)*



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



*Defined in [Terminal.ts:314](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L314)*



Render the terminal status into the canvas context. It works with a list of _dirty_ tiles so it only renders what's changed.

It's called automatically if `options.autoRender` is `true` (recommended), but can be set to `false` and call this method manually from outside.




**Returns:** `void`





___

<a id="renderall"></a>

###  renderAll

► **renderAll**(): `void`



*Defined in [Terminal.ts:394](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L394)*



Forces a render of all the tiles, not only the changed ones




**Returns:** `void`





___

<a id="setcursor"></a>

###  setCursor

► **setCursor**(col: *`number`*, line: *`number`*): `void`



*Defined in [Terminal.ts:443](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L443)*



Set the new position of the cursor


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  x-coordinate of the tile in the grid |
| line | `number`   |  y-coordinate of the tile in the grid |





**Returns:** `void`





___

<a id="setdebug"></a>

###  setDebug

► **setDebug**(options: *`boolean`⎮[DebugOptions](../interfaces/_terminal_.debugoptions.md)*): `void`



*Defined in [Terminal.ts:238](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L238)*



Set the debug options


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `boolean`⎮[DebugOptions](../interfaces/_terminal_.debugoptions.md)   |  `true` to enable default debug options, `false` to disable it, an object to specify each option |





**Returns:** `void`





___

<a id="setoptions"></a>

###  setOptions

► **setOptions**(options: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): `void`



*Defined in [Terminal.ts:196](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L196)*



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



*Defined in [Terminal.ts:537](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L537)*



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



*Defined in [Terminal.ts:507](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L507)*



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



*Defined in [Terminal.ts:654](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L654)*



Works like `setText` but specifying all the properties of a tile, not only the text.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tiles | [Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]   |  Tile or list of tiles to set |
| col | `number`   |  x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`   |  y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `void`





___


