[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [Terminal](../classes/_terminal_.terminal.md)



# Class: Terminal


Basic terminal features rendered into a Canvas object

## Index

### Constructors

* [constructor](_terminal_.terminal.md#constructor)


### Methods

* [clear](_terminal_.terminal.md#clear)
* [getCursor](_terminal_.terminal.md#getcursor)
* [getText](_terminal_.terminal.md#gettext)
* [getTilePosition](_terminal_.terminal.md#gettileposition)
* [moveCursor](_terminal_.terminal.md#movecursor)
* [render](_terminal_.terminal.md#render)
* [renderAll](_terminal_.terminal.md#renderall)
* [setCursor](_terminal_.terminal.md#setcursor)
* [setDebug](_terminal_.terminal.md#setdebug)
* [setText](_terminal_.terminal.md#settext)
* [setTiles](_terminal_.terminal.md#settiles)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Terminal**(canvas: *`HTMLCanvasElement`*, options?: *[Options](../interfaces/_terminal_.options.md)*): [Terminal](_terminal_.terminal.md)


*Defined in [Terminal.ts:87](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L87)*



Creates a Terminal associated to a canvas element.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| canvas | `HTMLCanvasElement`   |  `<canvas>` element associated to the Terminal |
| options | [Options](../interfaces/_terminal_.options.md)   |  - |





**Returns:** [Terminal](_terminal_.terminal.md)

---


## Methods
<a id="clear"></a>

###  clear

► **clear**(): `void`



*Defined in [Terminal.ts:137](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L137)*



Clear the terminal, reseting it to the `options.defaultTile`




**Returns:** `void`





___

<a id="getcursor"></a>

###  getCursor

► **getCursor**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:227](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L227)*



Get the current position of the cursor, in tile coordinates




**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)





___

<a id="gettext"></a>

###  getText

► **getText**(size?: *`number`*, col?: *`number`*, line?: *`number`*): `string`



*Defined in [Terminal.ts:337](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L337)*



Get the text of the terminal. By default gets the text from the current position of the cursor. If the `size` is reaches the end of the line, it will continue in the next one.


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| size | `number`  | 1 |   Number of tiles to get |
| col | `number`  | - |   x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`  | - |   y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `string`





___

<a id="gettileposition"></a>

###  getTilePosition

► **getTilePosition**(x: *`number`*, y: *`number`*): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:289](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L289)*



Given a position in pixels relative to the top-left corner of the terminal, get the corresponding tile


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | `number`   |  pixels from the left corner in the grid |
| y | `number`   |  pixels from the top corner in the grid |





**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)





___

<a id="movecursor"></a>

###  moveCursor

► **moveCursor**(dx: *`number`*, dy: *`number`*): `void`



*Defined in [Terminal.ts:278](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L278)*



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



*Defined in [Terminal.ts:167](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L167)*



Render the terminal status into the canvas context. It works with a list of _dirty_ tiles so it only renders what's changed.

It's called automatically if `options.autoRender` is `true` (recommended), but can be set to `false` and call this method manually from outside.




**Returns:** `void`





___

<a id="renderall"></a>

###  renderAll

► **renderAll**(): `void`



*Defined in [Terminal.ts:214](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L214)*



Forces a render of all the tiles, not only the changed ones




**Returns:** `void`





___

<a id="setcursor"></a>

###  setCursor

► **setCursor**(col: *`number`*, line: *`number`*): `void`



*Defined in [Terminal.ts:240](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L240)*



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



*Defined in [Terminal.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L118)*



Set the debug options


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `boolean`⎮[DebugOptions](../interfaces/_terminal_.debugoptions.md)   |  `true` to enable default debug options, `false` to disable it, an object to specify each option |





**Returns:** `void`





___

<a id="settext"></a>

###  setText

► **setText**(text: *`string`*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:307](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L307)*



Input a simple text in the terminal. By default the text will be set in the current position of the cursor. If the text reaches the right side of the terminal, will break into a new line as is (there's no word begin-end control when breaking a word). There's no character escape done (such as \n)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  text to set in the given position |
| col | `number`   |  x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`   |  y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `void`





___

<a id="settiles"></a>

###  setTiles

► **setTiles**(tiles: *[Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:359](https://github.com/danikaze/terminal-in-canvas/blob/34567b2/src/Terminal.ts#L359)*



Works like `setText1 but specifying all the properties of a tile, not only the text.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tiles | [Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]   |  Tile or list of tiles to set |
| col | `number`   |  x-position of the starting tile. Current position of the cursor if not specified |
| line | `number`   |  y-position of the starting tile. Current position of the cursor if not specified |





**Returns:** `void`





___


