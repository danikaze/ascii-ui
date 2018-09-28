[terminal-in-canvas](../README.md) > ["widgets/Select"](../modules/_widgets_select_.md) > [InternalOption](../interfaces/_widgets_select_.internaloption.md)

# Interface: InternalOption

## Type parameters
#### T 
## Hierarchy

**InternalOption**

## Index

### Properties

* [endLine](_widgets_select_.internaloption.md#endline)
* [option](_widgets_select_.internaloption.md#option)
* [processedText](_widgets_select_.internaloption.md#processedtext)
* [selected](_widgets_select_.internaloption.md#selected)
* [startLine](_widgets_select_.internaloption.md#startline)

---

## Properties

<a id="endline"></a>

###  endLine

**● endLine**: *`number`*

*Defined in [widgets/Select.ts:76](https://github.com/danikaze/terminal-in-canvas/blob/bacbdf6/src/widgets/Select.ts#L76)*

Line where the next option should start (start + processedText.length)

___
<a id="option"></a>

###  option

**● option**: *[SelectOption](_widgets_select_.selectoption.md)<`T`>*

*Defined in [widgets/Select.ts:68](https://github.com/danikaze/terminal-in-canvas/blob/bacbdf6/src/widgets/Select.ts#L68)*

Copy of the provided option

___
<a id="processedtext"></a>

###  processedText

**● processedText**: *`string`[]*

*Defined in [widgets/Select.ts:72](https://github.com/danikaze/terminal-in-canvas/blob/bacbdf6/src/widgets/Select.ts#L72)*

Preprocessed text to draw (one string per line)

___
<a id="selected"></a>

###  selected

**● selected**: *`boolean`*

*Defined in [widgets/Select.ts:70](https://github.com/danikaze/terminal-in-canvas/blob/bacbdf6/src/widgets/Select.ts#L70)*

Will be true if selected

___
<a id="startline"></a>

###  startLine

**● startLine**: *`number`*

*Defined in [widgets/Select.ts:74](https://github.com/danikaze/terminal-in-canvas/blob/bacbdf6/src/widgets/Select.ts#L74)*

Line where this option should start (accumulated number of lines of the previous options)

___

