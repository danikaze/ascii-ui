[ascii-ui API documentation](../README.md) > ["widgets/ProgressBar"](../modules/_widgets_progressbar_.md) > [ProgressBarOptions](../interfaces/_widgets_progressbar_.progressbaroptions.md)

# Interface: ProgressBarOptions

## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ ProgressBarOptions**

## Index

### Properties

* [col](_widgets_progressbar_.progressbaroptions.md#col)
* [completedStyle](_widgets_progressbar_.progressbaroptions.md#completedstyle)
* [currentStyle](_widgets_progressbar_.progressbaroptions.md#currentstyle)
* [direction](_widgets_progressbar_.progressbaroptions.md#direction)
* [endStyle](_widgets_progressbar_.progressbaroptions.md#endstyle)
* [focusable](_widgets_progressbar_.progressbaroptions.md#focusable)
* [height](_widgets_progressbar_.progressbaroptions.md#height)
* [line](_widgets_progressbar_.progressbaroptions.md#line)
* [pendingStyle](_widgets_progressbar_.progressbaroptions.md#pendingstyle)
* [progress](_widgets_progressbar_.progressbaroptions.md#progress)
* [startStyle](_widgets_progressbar_.progressbaroptions.md#startstyle)
* [tabIndex](_widgets_progressbar_.progressbaroptions.md#tabindex)
* [width](_widgets_progressbar_.progressbaroptions.md#width)

---

## Properties

<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:10](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L10)*

x-position of the widget in terminal tiles

___
<a id="completedstyle"></a>

### `<Optional>` completedStyle

**● completedStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [widgets/ProgressBar.ts:15](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L15)*

Style to use for the completed part of the bar

___
<a id="currentstyle"></a>

### `<Optional>` currentStyle

**● currentStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [widgets/ProgressBar.ts:19](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L19)*

Style to use for current point of the bar. If not specified will be replaced by treated as a completed part

___
<a id="direction"></a>

### `<Optional>` direction

**● direction**: * "horizontal" &#124; "vertical"
*

*Defined in [widgets/ProgressBar.ts:11](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L11)*

Direction of the progress bar

___
<a id="endstyle"></a>

### `<Optional>` endStyle

**● endStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [widgets/ProgressBar.ts:23](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L23)*

Style to use for the end point of the bar (as a border)

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
<a id="pendingstyle"></a>

### `<Optional>` pendingStyle

**● pendingStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [widgets/ProgressBar.ts:17](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L17)*

Style to use for the pending part of the bar

___
<a id="progress"></a>

### `<Optional>` progress

**● progress**: *`number`*

*Defined in [widgets/ProgressBar.ts:13](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L13)*

Progress to display (0-1)

___
<a id="startstyle"></a>

### `<Optional>` startStyle

**● startStyle**: *[TextTile](_terminal_.texttile.md)*

*Defined in [widgets/ProgressBar.ts:21](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/widgets/ProgressBar.ts#L21)*

Style to use for the start point of the bar (as a border)

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:20](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L20)*

value use for ordering the selection order with the keys

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:14](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/Widget.ts#L14)*

widget width in terminal tiles

___

