[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [InternalTile](../interfaces/_terminal_.internaltile.md)

# Interface: InternalTile

## Hierarchy

↳  [TextTile](_terminal_.texttile.md)

 [ImageTile](_terminal_.imagetile.md)

**↳ InternalTile**

## Index

### Properties

* [bg](_terminal_.internaltile.md#bg)
* [char](_terminal_.internaltile.md#char)
* [crop](_terminal_.internaltile.md#crop)
* [dstH](_terminal_.internaltile.md#dsth)
* [dstW](_terminal_.internaltile.md#dstw)
* [fg](_terminal_.internaltile.md#fg)
* [font](_terminal_.internaltile.md#font)
* [image](_terminal_.internaltile.md#image)
* [offset](_terminal_.internaltile.md#offset)
* [offsetX](_terminal_.internaltile.md#offsetx)
* [offsetY](_terminal_.internaltile.md#offsety)
* [x](_terminal_.internaltile.md#x)
* [y](_terminal_.internaltile.md#y)

---

## Properties

<a id="bg"></a>

### `<Optional>` bg

**● bg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:94](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L94)*

background color (i.e. `#000000`)

___
<a id="char"></a>

###  char

**● char**: *`string`*

*Inherited from [TextTile](_terminal_.texttile.md).[char](_terminal_.texttile.md#char)*

*Defined in [Terminal.ts:151](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L151)*

char to display in the tile

___
<a id="crop"></a>

### `<Optional>` crop

**● crop**: *[ImageCropParams](_terminal_.imagecropparams.md)*

*Inherited from [ImageTile](_terminal_.imagetile.md).[crop](_terminal_.imagetile.md#crop)*

*Defined in [Terminal.ts:164](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L164)*

Crop parameters for `img`

___
<a id="dsth"></a>

###  dstH

**● dstH**: *`number`*

*Inherited from [ImageTile](_terminal_.imagetile.md).[dstH](_terminal_.imagetile.md#dsth)*

*Defined in [Terminal.ts:160](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L160)*

destiny height

___
<a id="dstw"></a>

###  dstW

**● dstW**: *`number`*

*Inherited from [ImageTile](_terminal_.imagetile.md).[dstW](_terminal_.imagetile.md#dstw)*

*Defined in [Terminal.ts:158](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L158)*

destiny width

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
<a id="image"></a>

###  image

**● image**: *[AcceptedImage](../modules/_terminal_.md#acceptedimage)*

*Inherited from [ImageTile](_terminal_.imagetile.md).[image](_terminal_.imagetile.md#image)*

*Defined in [Terminal.ts:156](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L156)*

image to draw

___
<a id="offset"></a>

### `<Optional>` offset

**● offset**: *[ImageOffset](_terminal_.imageoffset.md)*

*Inherited from [ImageTile](_terminal_.imagetile.md).[offset](_terminal_.imagetile.md#offset)*

*Defined in [Terminal.ts:162](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L162)*

Offset in the destiny coordinates

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
<a id="x"></a>

###  x

**● x**: *`number`*

*Defined in [Terminal.ts:169](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L169)*

pre-calculated tile (not contents) x-position in pixels

___
<a id="y"></a>

###  y

**● y**: *`number`*

*Defined in [Terminal.ts:171](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Terminal.ts#L171)*

pre-calculated tile (not contents) y-position in pixels

___

