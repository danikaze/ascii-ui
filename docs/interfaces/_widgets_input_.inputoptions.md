[terminal-in-canvas](../README.md) > ["widgets/Input"](../modules/_widgets_input_.md) > [InputOptions](../interfaces/_widgets_input_.inputoptions.md)

# Interface: InputOptions

## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ InputOptions**

## Index

### Properties

* [col](_widgets_input_.inputoptions.md#col)
* [focusable](_widgets_input_.inputoptions.md#focusable)
* [height](_widgets_input_.inputoptions.md#height)
* [line](_widgets_input_.inputoptions.md#line)
* [maxLength](_widgets_input_.inputoptions.md#maxlength)
* [password](_widgets_input_.inputoptions.md#password)
* [passwordCharacter](_widgets_input_.inputoptions.md#passwordcharacter)
* [tabIndex](_widgets_input_.inputoptions.md#tabindex)
* [width](_widgets_input_.inputoptions.md#width)

---

## Properties

<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L9)*

x-position of the widget in terminal tiles

___
<a id="focusable"></a>

### `<Optional>` focusable

**● focusable**: *`boolean`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L17)*

if `true`, the widget can be selectable

___
<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:15](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L15)*

widget height in terminal tiles

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L11)*

y-position of the widget in terminal tiles

___
<a id="maxlength"></a>

### `<Optional>` maxLength

**● maxLength**: *`number`*

*Defined in [widgets/Input.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/widgets/Input.ts#L14)*

If `> 0`, only will allow the specified number of characters

___
<a id="password"></a>

### `<Optional>` password

**● password**: *`boolean`*

*Defined in [widgets/Input.ts:10](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/widgets/Input.ts#L10)*

If `true`, it won't display the real value but `passwordCharacter`

___
<a id="passwordcharacter"></a>

### `<Optional>` passwordCharacter

**● passwordCharacter**: *`string`*

*Defined in [widgets/Input.ts:12](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/widgets/Input.ts#L12)*

If `password` is `true`, it will display this character instead of the real value

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:19](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L19)*

value use for ordering the selection order with the keys

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:13](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/Widget.ts#L13)*

widget width in terminal tiles

___

