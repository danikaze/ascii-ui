[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md) > [TextTile](../interfaces/_terminal_.texttile.md)

# Interface: TextTile

## Hierarchy

 [CharStyle](_terminal_.charstyle.md)

**↳ TextTile**

↳  [InternalTile](_terminal_.internaltile.md)

↳  [DecayTile](_terminal_.decaytile.md)

## Index

### Properties

* [bg](_terminal_.texttile.md#bg)
* [char](_terminal_.texttile.md#char)
* [fg](_terminal_.texttile.md#fg)
* [font](_terminal_.texttile.md#font)
* [offsetX](_terminal_.texttile.md#offsetx)
* [offsetY](_terminal_.texttile.md#offsety)

---

## Properties

<a id="bg"></a>

### `<Optional>` bg

**● bg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:93](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L93)*

background color (i.e. `#000000`)

___
<a id="char"></a>

###  char

**● char**: *`string`*

*Defined in [Terminal.ts:142](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L142)*

char to display in the tile

___
<a id="fg"></a>

### `<Optional>` fg

**● fg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[fg](_terminal_.charstyle.md#fg)*

*Defined in [Terminal.ts:91](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L91)*

foreground color (i.e. `#00ff00`)

___
<a id="font"></a>

### `<Optional>` font

**● font**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[font](_terminal_.charstyle.md#font)*

*Defined in [Terminal.ts:85](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L85)*

font or font-family to use in the terminal The format is in this order: \[style\] \[variant\] \[weight\] \[family\]

___
<a id="offsetx"></a>

### `<Optional>` offsetX

**● offsetX**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetX](_terminal_.charstyle.md#offsetx)*

*Defined in [Terminal.ts:87](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L87)*

x-offset to apply to each character inside the tile

___
<a id="offsety"></a>

### `<Optional>` offsetY

**● offsetY**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetY](_terminal_.charstyle.md#offsety)*

*Defined in [Terminal.ts:89](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Terminal.ts#L89)*

y-offset to apply to each character inside the tile

___

