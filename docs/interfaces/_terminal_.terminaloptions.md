[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)



# Interface: TerminalOptions

## Hierarchy


 [CharStyle](_terminal_.charstyle.md)

**↳ TerminalOptions**








## Properties
<a id="autorender"></a>

### «Optional» autoRender

**●  autoRender**:  *`boolean`* 

*Defined in [Terminal.ts:68](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L68)*



`true` to let the terminal manage the screen changes




___

<a id="autosize"></a>

### «Optional» autoSize

**●  autoSize**:  *`boolean`* 

*Defined in [Terminal.ts:70](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L70)*



if `true`, the containing canvas will be resized to contain the grid




___

<a id="avoiddoublerendering"></a>

### «Optional» avoidDoubleRendering

**●  avoidDoubleRendering**:  *`boolean`* 

*Defined in [Terminal.ts:84](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L84)*



Optimization? If `true` it will check if the tile to render is already in the queue to avoid rendering it twice




___

<a id="bg"></a>

### «Optional» bg

**●  bg**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:44](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L44)*



background color (i.e. `#000000`)




___

<a id="columns"></a>

### «Optional» columns

**●  columns**:  *`number`* 

*Defined in [Terminal.ts:64](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L64)*



number of columns of the terminal, in number of tiles




___

<a id="commands"></a>

### «Optional» commands

**●  commands**:  *`object`* 

*Defined in [Terminal.ts:80](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L80)*



escape secuences to parse and their callback functions

#### Type declaration


[key: `string`]: [EscapeCallback](../modules/_terminal_.md#escapecallback)






___

<a id="cursor"></a>

### «Optional» cursor

**●  cursor**:  *`boolean`* 

*Defined in [Terminal.ts:72](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L72)*



`true` to show the cursor




___

<a id="cursorfrequency"></a>

### «Optional» cursorFrequency

**●  cursorFrequency**:  *`number`* 

*Defined in [Terminal.ts:74](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L74)*



blinking frequency of the cursor. If set to `0` the blink will be disabled




___

<a id="decayinitialalpha"></a>

### «Optional» decayInitialAlpha

**●  decayInitialAlpha**:  *`number`* 

*Defined in [Terminal.ts:78](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L78)*



initial opacity for the decay tile, from 0 to 1




___

<a id="decaytime"></a>

### «Optional» decayTime

**●  decayTime**:  *`number`* 

*Defined in [Terminal.ts:76](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L76)*



if > 0, milliseconds that the characters will take before disapear when changing




___

<a id="fg"></a>

### «Optional» fg

**●  fg**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fg](_terminal_.charstyle.md#fg)*

*Defined in [Terminal.ts:42](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L42)*



foreground color (i.e. `#00ff00`)




___

<a id="font"></a>

### «Optional» font

**●  font**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[font](_terminal_.charstyle.md#font)*

*Defined in [Terminal.ts:36](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L36)*



font or font-family to use in the terminal The format is in this order: [style] [variant] [weight] [family]




___

<a id="fontoffsetx"></a>

### «Optional» fontOffsetX

**●  fontOffsetX**:  *`number`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fontOffsetX](_terminal_.charstyle.md#fontoffsetx)*

*Defined in [Terminal.ts:38](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L38)*



x-offset to apply to each character inside the tile




___

<a id="fontoffsety"></a>

### «Optional» fontOffsetY

**●  fontOffsetY**:  *`number`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fontOffsetY](_terminal_.charstyle.md#fontoffsety)*

*Defined in [Terminal.ts:40](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L40)*



y-offset to apply to each character inside the tile




___

<a id="rows"></a>

### «Optional» rows

**●  rows**:  *`number`* 

*Defined in [Terminal.ts:66](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L66)*



number of rows of the terminal, in number of tiles




___

<a id="tileheight"></a>

### «Optional» tileHeight

**●  tileHeight**:  *`number`* 

*Defined in [Terminal.ts:62](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L62)*



height of a tile in px




___

<a id="tilewidth"></a>

### «Optional» tileWidth

**●  tileWidth**:  *`number`* 

*Defined in [Terminal.ts:60](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L60)*



width of a tile in px




___

<a id="verbose"></a>

### «Optional» verbose

**●  verbose**:  *`boolean`* 

*Defined in [Terminal.ts:86](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L86)*



`true` to enable debug console messages options, `false` to disable them




___

<a id="viewport"></a>

### «Optional» viewport

**●  viewport**:  *[ViewPortOptions](_terminal_.viewportoptions.md)* 

*Defined in [Terminal.ts:82](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/Terminal.ts#L82)*



Limit within the Terminal will draw




___


