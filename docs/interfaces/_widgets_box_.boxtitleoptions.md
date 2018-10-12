[ascii-ui API documentation](../README.md) > ["widgets/Box"](../modules/_widgets_box_.md) > [BoxTitleOptions](../interfaces/_widgets_box_.boxtitleoptions.md)

# Interface: BoxTitleOptions

## Hierarchy

 [CharStyle](_terminal_.charstyle.md)

**↳ BoxTitleOptions**

## Index

### Properties

* [bg](_widgets_box_.boxtitleoptions.md#bg)
* [ellipsis](_widgets_box_.boxtitleoptions.md#ellipsis)
* [fg](_widgets_box_.boxtitleoptions.md#fg)
* [font](_widgets_box_.boxtitleoptions.md#font)
* [marginLeft](_widgets_box_.boxtitleoptions.md#marginleft)
* [marginRight](_widgets_box_.boxtitleoptions.md#marginright)
* [offsetX](_widgets_box_.boxtitleoptions.md#offsetx)
* [offsetY](_widgets_box_.boxtitleoptions.md#offsety)

---

## Properties

<a id="bg"></a>

### `<Optional>` bg

**● bg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[bg](_terminal_.charstyle.md#bg)*

*Defined in [Terminal.ts:112](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L112)*

background color (i.e. `#000000`)

___
<a id="ellipsis"></a>

### `<Optional>` ellipsis

**● ellipsis**: *`string`*

*Defined in [widgets/Box.ts:29](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Box.ts#L29)*

String to use when the title doesn't fit in the box

___
<a id="fg"></a>

### `<Optional>` fg

**● fg**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[fg](_terminal_.charstyle.md#fg)*

*Defined in [Terminal.ts:110](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L110)*

foreground color (i.e. `#00ff00`)

___
<a id="font"></a>

### `<Optional>` font

**● font**: *`string`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[font](_terminal_.charstyle.md#font)*

*Defined in [Terminal.ts:104](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L104)*

font or font-family to use in the terminal The format is in this order: \[style\] \[variant\] \[weight\] \[family\]

___
<a id="marginleft"></a>

### `<Optional>` marginLeft

**● marginLeft**: *`number`*

*Defined in [widgets/Box.ts:25](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Box.ts#L25)*

Number of border tiles to leave to the left of the title

___
<a id="marginright"></a>

### `<Optional>` marginRight

**● marginRight**: *`number`*

*Defined in [widgets/Box.ts:27](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Box.ts#L27)*

Number of border tiles to leave to the right of the title

___
<a id="offsetx"></a>

### `<Optional>` offsetX

**● offsetX**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetX](_terminal_.charstyle.md#offsetx)*

*Defined in [Terminal.ts:106](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L106)*

x-offset to apply to each character inside the tile

___
<a id="offsety"></a>

### `<Optional>` offsetY

**● offsetY**: *`number`*

*Inherited from [CharStyle](_terminal_.charstyle.md).[offsetY](_terminal_.charstyle.md#offsety)*

*Defined in [Terminal.ts:108](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L108)*

y-offset to apply to each character inside the tile

___

