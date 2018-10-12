[ascii-ui API documentation](../README.md) > ["widgets/Text"](../modules/_widgets_text_.md) > [TextOptions](../interfaces/_widgets_text_.textoptions.md)

# Interface: TextOptions

## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ TextOptions**

## Index

### Properties

* [col](_widgets_text_.textoptions.md#col)
* [ellipsis](_widgets_text_.textoptions.md#ellipsis)
* [fitPageEnd](_widgets_text_.textoptions.md#fitpageend)
* [focusable](_widgets_text_.textoptions.md#focusable)
* [height](_widgets_text_.textoptions.md#height)
* [line](_widgets_text_.textoptions.md#line)
* [persistentTypewritter](_widgets_text_.textoptions.md#persistenttypewritter)
* [skip](_widgets_text_.textoptions.md#skip)
* [tabIndex](_widgets_text_.textoptions.md#tabindex)
* [text](_widgets_text_.textoptions.md#text)
* [textStyle](_widgets_text_.textoptions.md#textstyle)
* [tokenizer](_widgets_text_.textoptions.md#tokenizer)
* [typewritterDelay](_widgets_text_.textoptions.md#typewritterdelay)
* [width](_widgets_text_.textoptions.md#width)

---

## Properties

<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:10](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L10)*

x-position of the widget in terminal tiles

___
<a id="ellipsis"></a>

### `<Optional>` ellipsis

**● ellipsis**: *`string`*

*Defined in [widgets/Text.ts:26](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L26)*

If `tokenizer` is `false`, the `ellipsis` text will be appended when the text is too long

___
<a id="fitpageend"></a>

### `<Optional>` fitPageEnd

**● fitPageEnd**: *`boolean`*

*Defined in [widgets/Text.ts:38](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L38)*

If `true`, it won't allow empty lines at the end of a page and the text will end at the last line of the widget. Set to `false` to allow empty lines (so the first line is the right next one to the last of the previous page)

___
<a id="focusable"></a>

### `<Optional>` focusable

**● focusable**: *`boolean`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:18](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L18)*

if `true`, the widget can be selectable

___
<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:16](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L16)*

widget height in terminal tiles

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:12](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L12)*

y-position of the widget in terminal tiles

___
<a id="persistenttypewritter"></a>

### `<Optional>` persistentTypewritter

**● persistentTypewritter**: *`boolean`*

*Defined in [widgets/Text.ts:48](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L48)*

Set to `false` to apply the typewritter to the text again when it appears even if it was shown already before

___
<a id="skip"></a>

### `<Optional>` skip

**● skip**: *`number`*

*Defined in [widgets/Text.ts:31](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L31)*

Number of characters to skip. Useful to create a horizontal text scrolling effect

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:20](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L20)*

value use for ordering the selection order with the keys

___
<a id="text"></a>

### `<Optional>` text

**● text**: *`string`*

*Defined in [widgets/Text.ts:12](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L12)*

Text to display

___
<a id="textstyle"></a>

### `<Optional>` textStyle

**● textStyle**: *[CharStyle](_terminal_.charstyle.md)*

*Defined in [widgets/Text.ts:17](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L17)*

Basic style of the text Further styles can be applied with the `commands` option of the Terminal

___
<a id="tokenizer"></a>

### `<Optional>` tokenizer

**● tokenizer**: *[TokenizerFunction](../modules/_util_tokenizer_.md#tokenizerfunction)*

*Defined in [widgets/Text.ts:22](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L22)*

How to split the text (for new lines, etc.) If `undefined` or `null`, the text will not be splitted (no-wrap)

___
<a id="typewritterdelay"></a>

### `<Optional>` typewritterDelay

**● typewritterDelay**: *`number`*

*Defined in [widgets/Text.ts:43](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/widgets/Text.ts#L43)*

Ms. to wait between each character when writting new text Set to `0` (default) to disable it

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:14](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/Widget.ts#L14)*

widget width in terminal tiles

___

