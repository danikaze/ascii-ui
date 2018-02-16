[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [Terminal](../classes/_terminal_.terminal.md)



# Class: Terminal


Offers terminal features into a Canvas object

## Index

### Constructors

* [constructor](_terminal_.terminal.md#constructor)


### Methods

* [clear](_terminal_.terminal.md#clear)
* [getCursor](_terminal_.terminal.md#getcursor)
* [getText](_terminal_.terminal.md#gettext)
* [getTextBlock](_terminal_.terminal.md#gettextblock)
* [getTilePosition](_terminal_.terminal.md#gettileposition)
* [moveCursor](_terminal_.terminal.md#movecursor)
* [render](_terminal_.terminal.md#render)
* [renderAll](_terminal_.terminal.md#renderall)
* [setCursor](_terminal_.terminal.md#setcursor)
* [setDebug](_terminal_.terminal.md#setdebug)
* [setText](_terminal_.terminal.md#settext)
* [setTextBlock](_terminal_.terminal.md#settextblock)
* [setTiles](_terminal_.terminal.md#settiles)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Terminal**(canvas: *`HTMLCanvasElement`*, options?: *[Options](../interfaces/_terminal_.options.md)*): [Terminal](_terminal_.terminal.md)


*Defined in [Terminal.ts:77](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L77)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| canvas | `HTMLCanvasElement`   |  - |
| options | [Options](../interfaces/_terminal_.options.md)   |  - |





**Returns:** [Terminal](_terminal_.terminal.md)

---


## Methods
<a id="clear"></a>

###  clear

► **clear**(): `void`



*Defined in [Terminal.ts:115](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L115)*





**Returns:** `void`





___

<a id="getcursor"></a>

###  getCursor

► **getCursor**(): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:228](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L228)*





**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)





___

<a id="gettext"></a>

###  getText

► **getText**(size?: *`number`*, col?: *`number`*, line?: *`number`*): `string`



*Defined in [Terminal.ts:356](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L356)*



**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| size | `number`  | 1 |   - |
| col | `number`  | - |   - |
| line | `number`  | - |   - |





**Returns:** `string`





___

<a id="gettextblock"></a>

###  getTextBlock

► **getTextBlock**(width: *`number`*, height: *`number`*, col?: *`number`*, line?: *`number`*): `string`[]



*Defined in [Terminal.ts:372](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L372)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| width | `number`   |  - |
| height | `number`   |  - |
| col | `number`   |  - |
| line | `number`   |  - |





**Returns:** `string`[]





___

<a id="gettileposition"></a>

###  getTilePosition

► **getTilePosition**(x: *`number`*, y: *`number`*): [TilePosition](../interfaces/_terminal_.tileposition.md)



*Defined in [Terminal.ts:271](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L271)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | `number`   |  - |
| y | `number`   |  - |





**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)





___

<a id="movecursor"></a>

###  moveCursor

► **moveCursor**(dx: *`number`*, dy: *`number`*): `void`



*Defined in [Terminal.ts:267](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L267)*



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



*Defined in [Terminal.ts:138](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L138)*





**Returns:** `void`





___

<a id="renderall"></a>

###  renderAll

► **renderAll**(): `void`



*Defined in [Terminal.ts:183](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L183)*





**Returns:** `void`





___

<a id="setcursor"></a>

###  setCursor

► **setCursor**(col: *`number`*, line: *`number`*): `void`



*Defined in [Terminal.ts:235](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L235)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number`   |  - |
| line | `number`   |  - |





**Returns:** `void`





___

<a id="setdebug"></a>

###  setDebug

► **setDebug**(options: *`boolean`⎮[DebugOptions](../interfaces/_terminal_.debugoptions.md)*): `void`



*Defined in [Terminal.ts:99](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L99)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | `boolean`⎮[DebugOptions](../interfaces/_terminal_.debugoptions.md)   |  - |





**Returns:** `void`





___

<a id="settext"></a>

###  setText

► **setText**(text: *`string`*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:278](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L278)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  - |
| col | `number`   |  - |
| line | `number`   |  - |





**Returns:** `void`





___

<a id="settextblock"></a>

###  setTextBlock

► **setTextBlock**(text: *`string`[]*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:318](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L318)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`[]   |  - |
| col | `number`   |  - |
| line | `number`   |  - |





**Returns:** `void`





___

<a id="settiles"></a>

###  setTiles

► **setTiles**(tiles: *[Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]⎮[Tile](../interfaces/_terminal_.tile.md)[][]*, col?: *`number`*, line?: *`number`*): `void`



*Defined in [Terminal.ts:396](https://github.com/danikaze/terminal-in-canvas/blob/00ecf77/src/Terminal.ts#L396)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tiles | [Tile](../interfaces/_terminal_.tile.md)⎮[Tile](../interfaces/_terminal_.tile.md)[]⎮[Tile](../interfaces/_terminal_.tile.md)[][]   |  - |
| col | `number`   |  - |
| line | `number`   |  - |





**Returns:** `void`





___


