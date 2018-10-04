[ascii-ui API documentation](../README.md) > ["widgets/Select"](../modules/_widgets_select_.md) > [SelectOptions](../interfaces/_widgets_select_.selectoptions.md)

# Interface: SelectOptions

## Type parameters
#### T 
## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ SelectOptions**

## Index

### Properties

* [allowUnselect](_widgets_select_.selectoptions.md#allowunselect)
* [baseFocusedStyle](_widgets_select_.selectoptions.md#basefocusedstyle)
* [baseStyle](_widgets_select_.selectoptions.md#basestyle)
* [col](_widgets_select_.selectoptions.md#col)
* [disabledSelectedStyle](_widgets_select_.selectoptions.md#disabledselectedstyle)
* [disabledStyle](_widgets_select_.selectoptions.md#disabledstyle)
* [focusable](_widgets_select_.selectoptions.md#focusable)
* [height](_widgets_select_.selectoptions.md#height)
* [line](_widgets_select_.selectoptions.md#line)
* [loop](_widgets_select_.selectoptions.md#loop)
* [multiple](_widgets_select_.selectoptions.md#multiple)
* [options](_widgets_select_.selectoptions.md#options)
* [selectedFocusedStyle](_widgets_select_.selectoptions.md#selectedfocusedstyle)
* [selectedStyle](_widgets_select_.selectoptions.md#selectedstyle)
* [tabIndex](_widgets_select_.selectoptions.md#tabindex)
* [tokenizer](_widgets_select_.selectoptions.md#tokenizer)
* [width](_widgets_select_.selectoptions.md#width)

---

## Properties

<a id="allowunselect"></a>

### `<Optional>` allowUnselect

**● allowUnselect**: *`boolean`*

*Defined in [widgets/Select.ts:37](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L37)*

If `true`, will unselect any selected option if try to select a non-existing one

___
<a id="basefocusedstyle"></a>

### `<Optional>` baseFocusedStyle

**● baseFocusedStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:42](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L42)*

Character Style for base options when focused

___
<a id="basestyle"></a>

### `<Optional>` baseStyle

**● baseStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:40](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L40)*

Character Style for base options

___
<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:10](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L10)*

x-position of the widget in terminal tiles

___
<a id="disabledselectedstyle"></a>

### `<Optional>` disabledSelectedStyle

**● disabledSelectedStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:50](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L50)*

Character Style for disabled options when selected

___
<a id="disabledstyle"></a>

### `<Optional>` disabledStyle

**● disabledStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:48](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L48)*

Character Style for disabled options

___
<a id="focusable"></a>

### `<Optional>` focusable

**● focusable**: *`boolean`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:18](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L18)*

if `true`, the widget can be selectable

___
<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:16](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L16)*

widget height in terminal tiles

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:12](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L12)*

y-position of the widget in terminal tiles

___
<a id="loop"></a>

### `<Optional>` loop

**● loop**: *`boolean`*

*Defined in [widgets/Select.ts:33](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L33)*

If `true`, the first option will be highlighted after the last one, and viceversa

___
<a id="multiple"></a>

### `<Optional>` multiple

**● multiple**: *`boolean`*

*Defined in [widgets/Select.ts:35](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L35)*

When `false`, it will be only one option selected at most

___
<a id="options"></a>

###  options

**● options**: *`Array`<[SelectOption](_widgets_select_.selectoption.md)<`T`>>*

*Defined in [widgets/Select.ts:31](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L31)*

List of options, in order, to display. Editing this value (via `setOptions` will reset the selected one)

___
<a id="selectedfocusedstyle"></a>

### `<Optional>` selectedFocusedStyle

**● selectedFocusedStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:46](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L46)*

Character Style for selected options when focused

___
<a id="selectedstyle"></a>

### `<Optional>` selectedStyle

**● selectedStyle**: *[SelectOptionStyle](_widgets_select_.selectoptionstyle.md)*

*Defined in [widgets/Select.ts:44](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L44)*

Character Style for selected options

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:20](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L20)*

value use for ordering the selection order with the keys

___
<a id="tokenizer"></a>

### `<Optional>` tokenizer

**● tokenizer**: *[TokenizerFunction](../modules/_util_tokenizer_.md#tokenizerfunction)*

*Defined in [widgets/Select.ts:56](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/Select.ts#L56)*

How to split the text (for new lines, etc.) A custom TokenizerFunction can be provided. Leave undefined to use the default one

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:14](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L14)*

widget width in terminal tiles

___

