[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)



# Interface: TerminalOptions

## Hierarchy


 [CharStyle](_terminal_.charstyle.md)

**↳ TerminalOptions**








## Properties
<a id="autorender"></a>

### «Optional» autoRender

**●  autoRender**:  *`boolean`* 

*Defined in [Terminal.ts:69](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L69)*



`true` to let the terminal manage the screen changes




___

<a id="autosize"></a>

### «Optional» autoSize

**●  autoSize**:  *`boolean`* 

*Defined in [Terminal.ts:71](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L71)*



if `true`, the containing canvas will be resized to contain the grid




___

<a id="avoiddoublerendering"></a>

### «Optional» avoidDoubleRendering

**●  avoidDoubleRendering**:  *`boolean`* 

*Defined in [Terminal.ts:87](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L87)*



Optimization? If `true` it will check if the tile to render is already in the queue to avoid rendering it twice




___

<a id="bg"></a>

### «Optional» bg

**●  bg**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:45](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L45)*



background color (i.e. `#000000`)




___

<a id="columns"></a>

### «Optional» columns

**●  columns**:  *`number`* 

*Defined in [Terminal.ts:65](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L65)*



number of columns of the terminal, in number of tiles




___

<a id="commands"></a>

### «Optional» commands

**●  commands**:  *`object`* 

*Defined in [Terminal.ts:83](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L83)*



escape secuences to parse and their callback functions

#### Type declaration


[key: `string`]: [EscapeCallback](../modules/_terminal_.md#escapecallback)






___

<a id="cursor"></a>

### «Optional» cursor

**●  cursor**:  *`boolean`* 

*Defined in [Terminal.ts:73](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L73)*



`true` to show the cursor




___

<a id="cursorfrequency"></a>

### «Optional» cursorFrequency

**●  cursorFrequency**:  *`number`* 

*Defined in [Terminal.ts:75](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L75)*



blinking frequency of the cursor. If set to `0` the blink will be disabled




___

<a id="debug"></a>

### «Optional» debug

**●  debug**:  *`boolean`⎮[DebugOptions](_terminal_.debugoptions.md)* 

*Defined in [Terminal.ts:81](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L81)*



`true` to enable default debug options, `false` to disable it, an object to specify each option




___

<a id="decayinitialalpha"></a>

### «Optional» decayInitialAlpha

**●  decayInitialAlpha**:  *`number`* 

*Defined in [Terminal.ts:79](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L79)*



initial opacity for the decay tile, from 0 to 1




___

<a id="decaytime"></a>

### «Optional» decayTime

**●  decayTime**:  *`number`* 

*Defined in [Terminal.ts:77](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L77)*



if > 0, milliseconds that the characters will take before disapear when changing




___

<a id="fg"></a>

### «Optional» fg

**●  fg**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fg](_terminal_.charstyle.md#fg)*

*Defined in [Terminal.ts:43](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L43)*



foreground color (i.e. `#00ff00`)




___

<a id="font"></a>

### «Optional» font

**●  font**:  *`string`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[font](_terminal_.charstyle.md#font)*

*Defined in [Terminal.ts:37](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L37)*



font or font-family to use in the terminal The format is in this order: [style] [variant] [weight] [family]




___

<a id="fontoffsetx"></a>

### «Optional» fontOffsetX

**●  fontOffsetX**:  *`number`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fontOffsetX](_terminal_.charstyle.md#fontoffsetx)*

*Defined in [Terminal.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L39)*



x-offset to apply to each character inside the tile




___

<a id="fontoffsety"></a>

### «Optional» fontOffsetY

**●  fontOffsetY**:  *`number`* 

*Inherited from [CharStyle](_terminal_.charstyle.md).[fontOffsetY](_terminal_.charstyle.md#fontoffsety)*

*Defined in [Terminal.ts:41](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L41)*



y-offset to apply to each character inside the tile




___

<a id="rows"></a>

### «Optional» rows

**●  rows**:  *`number`* 

*Defined in [Terminal.ts:67](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L67)*



number of rows of the terminal, in number of tiles




___

<a id="tileheight"></a>

### «Optional» tileHeight

**●  tileHeight**:  *`number`* 

*Defined in [Terminal.ts:63](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L63)*



height of a tile in px




___

<a id="tilewidth"></a>

### «Optional» tileWidth

**●  tileWidth**:  *`number`* 

*Defined in [Terminal.ts:61](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L61)*



width of a tile in px




___

<a id="viewport"></a>

### «Optional» viewport

**●  viewport**:  *[ViewPortOptions](_terminal_.viewportoptions.md)* 

*Defined in [Terminal.ts:85](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Terminal.ts#L85)*



Limit within the Terminal will draw




___


