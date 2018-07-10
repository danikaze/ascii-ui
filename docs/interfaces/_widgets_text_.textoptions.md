[terminal-in-canvas](../README.md) > ["widgets/Text"](../modules/_widgets_text_.md) > [TextOptions](../interfaces/_widgets_text_.textoptions.md)



# Interface: TextOptions

## Hierarchy


 [WidgetOptions](_widget_.widgetoptions.md)

**↳ TextOptions**








## Properties
<a id="col"></a>

### «Optional» col

**●  col**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:7](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L7)*



x-position of the widget in terminal tiles




___

<a id="fitpageend"></a>

### «Optional» fitPageEnd

**●  fitPageEnd**:  *`boolean`* 

*Defined in [widgets/Text.ts:42](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L42)*



If `true`, it won't allow empty lines at the end of a page and the text will end at the last line of the widget. Set to `false` to allow empty lines (so the first line is the right next one to the last of the previous page)




___

<a id="focusable"></a>

### «Optional» focusable

**●  focusable**:  *`boolean`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:15](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L15)*



if `true`, the widget can be selectable




___

<a id="height"></a>

### «Optional» height

**●  height**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:13](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L13)*



widget height in terminal tiles




___

<a id="line"></a>

### «Optional» line

**●  line**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L9)*



y-position of the widget in terminal tiles




___

<a id="persistenttypewritter"></a>

### «Optional» persistentTypewritter

**●  persistentTypewritter**:  *`boolean`* 

*Defined in [widgets/Text.ts:52](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L52)*



Set to `false` to apply the typewritter to the text again when it appears even if it was shown already before




___

<a id="tabindex"></a>

### «Optional» tabIndex

**●  tabIndex**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L17)*



value use for ordering the selection order with the keys




___

<a id="text"></a>

### «Optional» text

**●  text**:  *`string`* 

*Defined in [widgets/Text.ts:23](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L23)*



Text to display




___

<a id="textstyle"></a>

### «Optional» textStyle

**●  textStyle**:  *[CharStyle](_terminal_.charstyle.md)* 

*Defined in [widgets/Text.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L28)*



Basic style of the text Further styles can be applied with the `commands` option of the Terminal




___

<a id="tokenizer"></a>

### «Optional» tokenizer

**●  tokenizer**:  *`boolean`⎮[TokenizerFunction](../modules/_widgets_text_.md#tokenizerfunction)* 

*Defined in [widgets/Text.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L35)*



How to split the text (for new lines, etc.) If `true`, the default function will be used A custom TokenizerFunction can be provided If `false` text will be splitted even in the middle of the words




___

<a id="typewritterdelay"></a>

### «Optional» typewritterDelay

**●  typewritterDelay**:  *`number`* 

*Defined in [widgets/Text.ts:47](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Text.ts#L47)*



Ms. to wait between each character when writting new text Set to `0` (default) to disable it




___

<a id="width"></a>

### «Optional» width

**●  width**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L11)*



widget width in terminal tiles




___


