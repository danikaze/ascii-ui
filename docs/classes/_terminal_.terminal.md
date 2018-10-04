[ascii-ui API documentation](../README.md) > ["Terminal"](../modules/_terminal_.md) > [Terminal](../classes/_terminal_.terminal.md)

# Class: Terminal

Basic terminal features rendered into a Canvas object

## Hierarchy

**Terminal**

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
* [setImage](_terminal_.terminal.md#setimage)
* [setOptions](_terminal_.terminal.md#setoptions)
* [setText](_terminal_.terminal.md#settext)
* [setTextStyle](_terminal_.terminal.md#settextstyle)
* [setTiles](_terminal_.terminal.md#settiles)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Terminal**(canvas: *`HTMLCanvasElement`*, options?: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): [Terminal](_terminal_.terminal.md)

*Defined in [Terminal.ts:219](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L219)*

Creates a Terminal associated to a canvas element.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| canvas | `HTMLCanvasElement` |  `<canvas>` element associated to the Terminal |
| `Optional` options | [TerminalOptions](../interfaces/_terminal_.terminaloptions.md) |  Terminal options |

**Returns:** [Terminal](_terminal_.terminal.md)

___

## Properties

<a id="eventmanager"></a>

###  eventManager

**● eventManager**: *[EventManager](_eventmanager_.eventmanager.md)*

*Defined in [Terminal.ts:191](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L191)*

event manager for this terminal

___
<a id="focusmanager"></a>

###  focusManager

**● focusManager**: *[FocusManager](_focusmanager_.focusmanager.md)*

*Defined in [Terminal.ts:189](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L189)*

focus manager for the Terminal widgets

___
<a id="options"></a>

### `<Protected>` options

**● options**: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*

*Defined in [Terminal.ts:193](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L193)*

terminal options

___
<a id="defaultoptions"></a>

### `<Static>` defaultOptions

**● defaultOptions**: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*

*Defined in [Terminal.ts:186](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L186)*

Default options for widget instances

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(startWidget?: * [Widget](_widget_.widget.md) &#124; `number`*): [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)<[Widget](_widget_.widget.md)>

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[__@iterator](../interfaces/_widgetcontainer_.widgetcontainer.md#___iterator)*

*Defined in [Terminal.ts:889](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L889)*

Get a bidirectional iterator to move across the attached widgets of the container

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` startWidget |  [Widget](_widget_.widget.md) &#124; `number`|  if specified, the next call will start with this widget (return the next or previous one) |

**Returns:** [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)<[Widget](_widget_.widget.md)>

___
<a id="attachwidget"></a>

###  attachWidget

▸ **attachWidget**<`WidgetType`>(WidgetClass: *[WidgetConstructor](../modules/_widget_.md#widgetconstructor)<`WidgetType`>*, options?: *`any`*): `WidgetType`

*Defined in [Terminal.ts:791](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L791)*

Create and attach a widget to this instance of the terminal

**Type parameters:**

#### WidgetType :  [Widget](_widget_.widget.md)
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| WidgetClass | [WidgetConstructor](../modules/_widget_.md#widgetconstructor)<`WidgetType`> |  Class of the widget |
| `Optional` options | `any` |  Options for the widget constructor |

**Returns:** `WidgetType`
handler of the attached widget. Required to deattach it.

___
<a id="clear"></a>

###  clear

▸ **clear**(): `void`

▸ **clear**(col: *`number`*, line: *`number`*, width: *`number`*, height: *`number`*): `void`

*Defined in [Terminal.ts:291](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L291)*

Clear the whole terminal

**Returns:** `void`

*Defined in [Terminal.ts:301](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L301)*

Clear only the specified part of the terminal

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number` |  Starting column |
| line | `number` |  Starting line |
| width | `number` |  Width of the block to clear |
| height | `number` |  Height of the vlock to clear |

**Returns:** `void`

___
<a id="dettachwidget"></a>

###  dettachWidget

▸ **dettachWidget**(widget: *[Widget](_widget_.widget.md)*): `boolean`

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[dettachWidget](../interfaces/_widgetcontainer_.widgetcontainer.md#dettachwidget)*

*Defined in [Terminal.ts:811](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L811)*

Dettach a widget from the terminal

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md) |  Widget to dettach |

**Returns:** `boolean`
`true` if the widget was found (and removed). `false` if not found

___
<a id="getcursor"></a>

###  getCursor

▸ **getCursor**(): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Defined in [Terminal.ts:493](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L493)*

Get the position of the cursor, in tile coordinates

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)
current position of the cursor, in tile coordinates

___
<a id="getleafwidgetat"></a>

###  getLeafWidgetAt

▸ **getLeafWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)

*Defined in [Terminal.ts:848](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L848)*

Traverse the containers to get the last possible widget at the specified position

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found

___
<a id="getparent"></a>

###  getParent

▸ **getParent**(): [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getParent](../interfaces/_widgetcontainer_.widgetcontainer.md#getparent)*

*Defined in [Terminal.ts:780](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L780)*

Get the reference to the parent of the widget, if any

**Returns:** [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)
parent if any, or `undefined`

___
<a id="getsize"></a>

###  getSize

▸ **getSize**(): [TileSize](../interfaces/_terminal_.tilesize.md)

*Defined in [Terminal.ts:472](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L472)*

Get the terminal size, measured in tiles

**Returns:** [TileSize](../interfaces/_terminal_.tilesize.md)
Size of the terminal, measured in tiles

___
<a id="gettext"></a>

###  getText

▸ **getText**(size?: *`number`*, col?: *`number`*, line?: *`number`*): `string`

*Defined in [Terminal.ts:728](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L728)*

Get the text of the terminal. By default gets the text from the current position of the cursor. If the `size` is reaches the end of the line, it will continue in the next one.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` size | `number` | 1 |  Number of tiles to get |
| `Optional` col | `number` | - |  x-position of the starting tile. Current position of the cursor if not specified |
| `Optional` line | `number` | - |  y-position of the starting tile. Current position of the cursor if not specified |

**Returns:** `string`

___
<a id="gettextstyle"></a>

###  getTextStyle

▸ **getTextStyle**(): [CharStyle](../interfaces/_terminal_.charstyle.md)

*Defined in [Terminal.ts:582](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L582)*

Get the current style being applied to the `setText` calls

**Returns:** [CharStyle](../interfaces/_terminal_.charstyle.md)

___
<a id="gettileposition"></a>

###  getTilePosition

▸ **getTilePosition**(x: *`number`*, y: *`number`*): [TilePosition](../interfaces/_terminal_.tileposition.md)

*Defined in [Terminal.ts:561](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L561)*

Given a position in pixels relative to the top-left corner of the terminal, get the corresponding tile

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | `number` |  pixels from the left corner in the grid |
| y | `number` |  pixels from the top corner in the grid |

**Returns:** [TilePosition](../interfaces/_terminal_.tileposition.md)

___
<a id="getviewport"></a>

###  getViewport

▸ **getViewport**(): [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)

*Defined in [Terminal.ts:463](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L463)*

Get the drawing limits (viewport) of the terminal

**Returns:** [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)
Current viewport of the terminal

___
<a id="getwidgetat"></a>

###  getWidgetAt

▸ **getWidgetAt**(column: *`number`*, line: *`number`*): [Widget](_widget_.widget.md)

*Implementation of [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md).[getWidgetAt](../interfaces/_widgetcontainer_.widgetcontainer.md#getwidgetat)*

*Defined in [Terminal.ts:831](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L831)*

Get a previously attached widget by its position

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  column of the terminal |
| line | `number` |  line of the terminal |

**Returns:** [Widget](_widget_.widget.md)
widget or `undefined` if not found (wrong id or previously dettached)

___
<a id="getwidgetpath"></a>

###  getWidgetPath

▸ **getWidgetPath**(widget: *[Widget](_widget_.widget.md)*): `Array`< [Widget](_widget_.widget.md) &#124; [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)>

*Defined in [Terminal.ts:872](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L872)*

Get the list of widgets from the widget until the terminal itself (not included) The result will be `undefined` if the widget is not found as a descendant of this terminal

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| widget | [Widget](_widget_.widget.md) |  Widget to start the list with |

**Returns:** `Array`< [Widget](_widget_.widget.md) &#124; [WidgetContainer](../interfaces/_widgetcontainer_.widgetcontainer.md)>
list of widgets from the `widget` itself (included) to the terminal (not included)

___
<a id="iscursorenabled"></a>

###  isCursorEnabled

▸ **isCursorEnabled**(): `boolean`

*Defined in [Terminal.ts:484](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L484)*

Get the current status of the cursor

**Returns:** `boolean`
`true` if the cursor is enabled, `false` otherwise

___
<a id="movecursor"></a>

###  moveCursor

▸ **moveCursor**(dx: *`number`*, dy: *`number`*): `void`

*Defined in [Terminal.ts:550](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L550)*

Set the new position of the cursor, relative to the current one

**Parameters:**

| Param | Type |
| ------ | ------ |
| dx | `number` |
| dy | `number` |

**Returns:** `void`

___
<a id="render"></a>

###  render

▸ **render**(): `void`

*Defined in [Terminal.ts:359](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L359)*

Render the terminal status into the canvas context. It works with a list of _dirty_ tiles so it only renders what's changed.

It's called automatically if `options.autoRender` is `true` (recommended), but can be set to `false` and call this method manually from outside.

**Returns:** `void`

___
<a id="renderall"></a>

###  renderAll

▸ **renderAll**(): `void`

*Defined in [Terminal.ts:448](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L448)*

Forces a render of all the tiles, not only the changed ones

**Returns:** `void`

___
<a id="setcursor"></a>

###  setCursor

▸ **setCursor**(col: *`number`*, line: *`number`*): `void`

*Defined in [Terminal.ts:506](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L506)*

Set the new position of the cursor

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| col | `number` |  x-coordinate of the tile in the grid |
| line | `number` |  y-coordinate of the tile in the grid |

**Returns:** `void`

___
<a id="setimage"></a>

###  setImage

▸ **setImage**(img: *[AcceptedImage](../modules/_terminal_.md#acceptedimage)*, col?: *`number`*, line?: *`number`*, offset?: *[ImageOffset](../interfaces/_terminal_.imageoffset.md)*, size?: *[ImageSize](../interfaces/_terminal_.imagesize.md)*, crop?: *[ImageCropParams](../interfaces/_terminal_.imagecropparams.md)*): `void`

*Defined in [Terminal.ts:706](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L706)*

Draws an image to the terminal.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| img | [AcceptedImage](../modules/_terminal_.md#acceptedimage) |  Image or source image to set |
| `Optional` col | `number` |  x-position of the starting tile. Current position of the cursor if not specified |
| `Optional` line | `number` |  y-position of the starting tile. Current position of the cursor if not specified |
| `Optional` offset | [ImageOffset](../interfaces/_terminal_.imageoffset.md) |
| `Optional` size | [ImageSize](../interfaces/_terminal_.imagesize.md) |
| `Optional` crop | [ImageCropParams](../interfaces/_terminal_.imagecropparams.md) |  If only a portion of \`img\` is to be drawn, cropping parameters are specified here |

**Returns:** `void`

___
<a id="setoptions"></a>

###  setOptions

▸ **setOptions**(options: *[TerminalOptions](../interfaces/_terminal_.terminaloptions.md)*): `void`

*Defined in [Terminal.ts:247](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L247)*

Update the values of the Terminal options

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [TerminalOptions](../interfaces/_terminal_.terminaloptions.md) |  new options to set |

**Returns:** `void`

___
<a id="settext"></a>

###  setText

▸ **setText**(text: *`string`*, col?: *`number`*, line?: *`number`*): `void`

*Defined in [Terminal.ts:605](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L605)*

Input a simple text in the terminal. By default the text will be set in the current position of the cursor. If the text reaches the right side of the terminal, will break into a new line as is (there's no word begin-end control when breaking a word). There's no character escape done (such as \\n)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string` |  text to set in the given position |
| `Optional` col | `number` |  x-position of the starting tile. Current position of the cursor if not specified |
| `Optional` line | `number` |  y-position of the starting tile. Current position of the cursor if not specified |

**Returns:** `void`

___
<a id="settextstyle"></a>

###  setTextStyle

▸ **setTextStyle**(style: *[CharStyle](../interfaces/_terminal_.charstyle.md)*): `void`

*Defined in [Terminal.ts:575](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L575)*

Set the style to apply in the `setText` calls. Passed `style` object can have other properties, but only the ones related to the style will be applied.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| style | [CharStyle](../interfaces/_terminal_.charstyle.md) |  new style to set for future text |

**Returns:** `void`

___
<a id="settiles"></a>

###  setTiles

▸ **setTiles**(tiles: * [TextTile](../interfaces/_terminal_.texttile.md) &#124; [TextTile](../interfaces/_terminal_.texttile.md)[] &#124; [ImageTile](../interfaces/_terminal_.imagetile.md) &#124; [ImageTile](../interfaces/_terminal_.imagetile.md)[]*, col?: *`number`*, line?: *`number`*): `void`

*Defined in [Terminal.ts:755](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Terminal.ts#L755)*

Works like `setText` but specifying all the properties of a tile, not only the text.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| tiles |  [TextTile](../interfaces/_terminal_.texttile.md) &#124; [TextTile](../interfaces/_terminal_.texttile.md)[] &#124; [ImageTile](../interfaces/_terminal_.imagetile.md) &#124; [ImageTile](../interfaces/_terminal_.imagetile.md)[]|  Tile or list of tiles to set |
| `Optional` col | `number` |  x-position of the starting tile. Current position of the cursor if not specified |
| `Optional` line | `number` |  y-position of the starting tile. Current position of the cursor if not specified |

**Returns:** `void`

___

