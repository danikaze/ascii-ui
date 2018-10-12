[ascii-ui API documentation](../README.md) > ["Terminal"](../modules/_terminal_.md) > [CommandAction](../interfaces/_terminal_.commandaction.md)

# Interface: CommandAction

## Hierarchy

**CommandAction**

## Index

### Properties

* [col](_terminal_.commandaction.md#col)
* [consumedCharacters](_terminal_.commandaction.md#consumedcharacters)
* [image](_terminal_.commandaction.md#image)
* [line](_terminal_.commandaction.md#line)
* [style](_terminal_.commandaction.md#style)
* [text](_terminal_.commandaction.md#text)

---

## Properties

<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Defined in [Terminal.ts:43](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L43)*

New value for the column cursor. Leave `undefined` to continue in the current position

___
<a id="consumedcharacters"></a>

###  consumedCharacters

**● consumedCharacters**: *`number`*

*Defined in [Terminal.ts:41](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L41)*

Number of consumed characters by the action. Needed to know where to continue parsing the text

___
<a id="image"></a>

### `<Optional>` image

**● image**: *`object`*

*Defined in [Terminal.ts:51](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L51)*

Image to inject in the current cursor position (or specified location by `col` and `line`)

#### Type declaration

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Defined in [Terminal.ts:45](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L45)*

New value for the column line. Leave `undefined` to continue in the current position

___
<a id="style"></a>

### `<Optional>` style

**● style**: *[CharStyle](_terminal_.charstyle.md)*

*Defined in [Terminal.ts:47](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L47)*

Text style to apply

___
<a id="text"></a>

### `<Optional>` text

**● text**: *`string`*

*Defined in [Terminal.ts:49](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Terminal.ts#L49)*

Text to inject in the current cursor position (or specified location by `col` and `line`)

___

