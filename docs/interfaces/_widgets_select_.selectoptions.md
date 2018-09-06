[terminal-in-canvas](../README.md) > ["widgets/Select"](../modules/_widgets_select_.md) > [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)

# Interface: SelectOptions

## Type parameters
#### T 
## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ SelectOptions**

## Index

### Properties

* [allowUnselect](_widgets_select_.selectoptions.md#allowunselect)
* [base](_widgets_select_.selectoptions.md#base)
* [col](_widgets_select_.selectoptions.md#col)
* [disabled](_widgets_select_.selectoptions.md#disabled)
* [focusable](_widgets_select_.selectoptions.md#focusable)
* [height](_widgets_select_.selectoptions.md#height)
* [line](_widgets_select_.selectoptions.md#line)
* [loop](_widgets_select_.selectoptions.md#loop)
* [options](_widgets_select_.selectoptions.md#options)
* [selected](_widgets_select_.selectoptions.md#selected)
* [selectedIndex](_widgets_select_.selectoptions.md#selectedindex)
* [tabIndex](_widgets_select_.selectoptions.md#tabindex)
* [tokenizer](_widgets_select_.selectoptions.md#tokenizer)
* [width](_widgets_select_.selectoptions.md#width)

---

## Properties

<a id="allowunselect"></a>

### `<Optional>` allowUnselect

**● allowUnselect**: *`boolean`*

*Defined in [widgets/Select.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L28)*

If `true`, will unselect any selected option if try to select a non-existing one

___
<a id="base"></a>

### `<Optional>` base

**● base**: *[CharStyle](_terminal_.charstyle.md)*

*Defined in [widgets/Select.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L35)*

Character Style for base options

___
<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L9)*

x-position of the widget in terminal tiles

___
<a id="disabled"></a>

### `<Optional>` disabled

**● disabled**: *[CharStyle](_terminal_.charstyle.md)*

*Defined in [widgets/Select.ts:39](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L39)*

Character Style for disabled options

___
<a id="focusable"></a>

### `<Optional>` focusable

**● focusable**: *`boolean`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L17)*

if `true`, the widget can be selectable

___
<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:15](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L15)*

widget height in terminal tiles

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L11)*

y-position of the widget in terminal tiles

___
<a id="loop"></a>

### `<Optional>` loop

**● loop**: *`boolean`*

*Defined in [widgets/Select.ts:24](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L24)*

If `true`, the first option will be highlighted after the last one, and viceversa

___
<a id="options"></a>

###  options

**● options**: *`Array`<[SelectOption](_widgets_select_.selectoption.md)<`T`>>*

*Defined in [widgets/Select.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L22)*

List of options, in order, to display. Editing this value (via `setOptions` will reset the selected one)

___
<a id="selected"></a>

### `<Optional>` selected

**● selected**: *[CharStyle](_terminal_.charstyle.md)*

*Defined in [widgets/Select.ts:37](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L37)*

Character Style for selected options

___
<a id="selectedindex"></a>

### `<Optional>` selectedIndex

**● selectedIndex**: *`number`*

*Defined in [widgets/Select.ts:26](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L26)*

Selected option index by default

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:19](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L19)*

value use for ordering the selection order with the keys

___
<a id="tokenizer"></a>

### `<Optional>` tokenizer

**● tokenizer**: *[TokenizerFunction](../modules/_util_tokenizer_.md#tokenizerfunction)*

*Defined in [widgets/Select.ts:33](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/widgets/Select.ts#L33)*

How to split the text (for new lines, etc.) A custom TokenizerFunction can be provided. Leave undefined to use the default one

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:13](https://github.com/danikaze/terminal-in-canvas/blob/6bf63ab/src/Widget.ts#L13)*

widget width in terminal tiles

___

