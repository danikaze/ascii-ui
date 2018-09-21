[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)

# Interface: TerminalOptions

## Hierarchy

 [CharStyle](_terminal_.charstyle.md)

**↳ TerminalOptions**

## Index

### Properties

* [autoRender](_terminal_.terminaloptions.md#autorender)
* [autoSize](_terminal_.terminaloptions.md#autosize)
* [avoidDoubleRendering](_terminal_.terminaloptions.md#avoiddoublerendering)
* [bg](_terminal_.terminaloptions.md#bg)
* [clearStyle](_terminal_.terminaloptions.md#clearstyle)
* [columns](_terminal_.terminaloptions.md#columns)
* [commands](_terminal_.terminaloptions.md#commands)
* [cursor](_terminal_.terminaloptions.md#cursor)
* [cursorFrequency](_terminal_.terminaloptions.md#cursorfrequency)
* [decayInitialAlpha](_terminal_.terminaloptions.md#decayinitialalpha)
* [decayTime](_terminal_.terminaloptions.md#decaytime)
* [fg](_terminal_.terminaloptions.md#fg)
* [font](_terminal_.terminaloptions.md#font)
* [maxColumns](_terminal_.terminaloptions.md#maxcolumns)
* [maxRows](_terminal_.terminaloptions.md#maxrows)
* [minColumns](_terminal_.terminaloptions.md#mincolumns)
* [minRows](_terminal_.terminaloptions.md#minrows)
* [offsetX](_terminal_.terminaloptions.md#offsetx)
* [offsetY](_terminal_.terminaloptions.md#offsety)
* [rows](_terminal_.terminaloptions.md#rows)
* [tileHeight](_terminal_.terminaloptions.md#tileheight)
* [tileWidth](_terminal_.terminaloptions.md#tilewidth)
* [verbose](_terminal_.terminaloptions.md#verbose)
* [viewport](_terminal_.terminaloptions.md#viewport)

---

## Properties

<a id="autorender"></a>

### `<Optional>` autoRender

**● autoRender**: *`boolean`*

*Defined in [Terminal.ts:126](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L126)*

`true` to let the terminal manage the screen changes

___
<a id="autosize"></a>

### `<Optional>` autoSize

**● autoSize**: *`boolean`*

*Defined in [Terminal.ts:128](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L128)*

if `true`, the containing canvas will be resized to contain the grid

___
<a id="avoiddoublerendering"></a>

### `<Optional>` avoidDoubleRendering

**● avoidDoubleRendering**: *`boolean`*

*Defined in [Terminal.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L142)*

Optimization? If `true` it will check if the tile to render is already in the queue to avoid rendering it twice

___
<a id="bg"></a>

### `<Optional>` bg

**● bg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:94](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L94)*

background color (i.e. `#000000`)

___
<a id="clearstyle"></a>

### `<Optional>` clearStyle

**● clearStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [Terminal.ts:146](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L146)*

Style used when calling `clear`

___
<a id="columns"></a>

### `<Optional>` columns

**● columns**: *`number`*

*Defined in [Terminal.ts:114](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L114)*

number of columns of the terminal, in number of tiles

___
<a id="commands"></a>

### `<Optional>` commands

**● commands**: *`object`*

*Defined in [Terminal.ts:138](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L138)*

escape secuences to parse and their callback functions

#### Type declaration

[key: `string`]: [EscapeCallback](../modules/_terminal_.md#escapecallback)

___
<a id="cursor"></a>

### `<Optional>` cursor

**● cursor**: *`boolean`*

*Defined in [Terminal.ts:130](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L130)*

`true` to show the cursor

___
<a id="cursorfrequency"></a>

### `<Optional>` cursorFrequency

**● cursorFrequency**: *`number`*

*Defined in [Terminal.ts:132](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L132)*

blinking frequency of the cursor. If set to `0` the blink will be disabled

___
<a id="decayinitialalpha"></a>

### `<Optional>` decayInitialAlpha

**● decayInitialAlpha**: *`number`*

*Defined in [Terminal.ts:136](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L136)*

initial opacity for the decay tile, from 0 to 1

___
<a id="decaytime"></a>

### `<Optional>` decayTime

**● decayTime**: *`number`*

*Defined in [Terminal.ts:134](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L134)*

if > 0, milliseconds that the characters will take before disapear when changing

___
<a id="fg"></a>

### `<Optional>` fg

**● fg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[fg](_terminal_.charstyle.md#fg)*

*Defined in [Terminal.ts:92](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L92)*

foreground color (i.e. `#00ff00`)

___
<a id="font"></a>

### `<Optional>` font

**● font**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[font](_terminal_.charstyle.md#font)*

*Defined in [Terminal.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L86)*

font or font-family to use in the terminal The format is in this order: \[style\] \[variant\] \[weight\] \[family\]

___
<a id="maxcolumns"></a>

### `<Optional>` maxColumns

**● maxColumns**: *`number`*

*Defined in [Terminal.ts:122](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L122)*

maximum number of columns (tiles) allowed

___
<a id="maxrows"></a>

### `<Optional>` maxRows

**● maxRows**: *`number`*

*Defined in [Terminal.ts:124](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L124)*

maximum number of rows (tiles) allowed

___
<a id="mincolumns"></a>

### `<Optional>` minColumns

**● minColumns**: *`number`*

*Defined in [Terminal.ts:118](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L118)*

minimum number of columns (tiles) allowed

___
<a id="minrows"></a>

### `<Optional>` minRows

**● minRows**: *`number`*

*Defined in [Terminal.ts:120](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L120)*

minimum number of rows (tiles) allowed

___
<a id="offsetx"></a>

### `<Optional>` offsetX

**● offsetX**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetX](_terminal_.charstyle.md#offsetx)*

*Defined in [Terminal.ts:88](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L88)*

x-offset to apply to each character inside the tile

___
<a id="offsety"></a>

### `<Optional>` offsetY

**● offsetY**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetY](_terminal_.charstyle.md#offsety)*

*Defined in [Terminal.ts:90](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L90)*

y-offset to apply to each character inside the tile

___
<a id="rows"></a>

### `<Optional>` rows

**● rows**: *`number`*

*Defined in [Terminal.ts:116](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L116)*

number of rows of the terminal, in number of tiles

___
<a id="tileheight"></a>

### `<Optional>` tileHeight

**● tileHeight**: *`number`*

*Defined in [Terminal.ts:112](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L112)*

height of a tile in px

___
<a id="tilewidth"></a>

### `<Optional>` tileWidth

**● tileWidth**: *`number`*

*Defined in [Terminal.ts:110](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L110)*

width of a tile in px

___
<a id="verbose"></a>

### `<Optional>` verbose

**● verbose**: *`boolean`*

*Defined in [Terminal.ts:144](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L144)*

`true` to enable debug console messages options, `false` to disable them

___
<a id="viewport"></a>

### `<Optional>` viewport

**● viewport**: *[ViewPortOptions](_terminal_.viewportoptions.md)*

*Defined in [Terminal.ts:140](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L140)*

Limit within the Terminal will draw

___

