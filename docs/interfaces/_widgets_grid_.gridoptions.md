[terminal-in-canvas](../README.md) > ["widgets/Grid"](../modules/_widgets_grid_.md) > [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)

# Interface: GridOptions

## Hierarchy

 [WidgetOptions](_widget_.widgetoptions.md)

**↳ GridOptions**

## Index

### Properties

* [borderStyle](_widgets_grid_.gridoptions.md#borderstyle)
* [borders](_widgets_grid_.gridoptions.md#borders)
* [col](_widgets_grid_.gridoptions.md#col)
* [columns](_widgets_grid_.gridoptions.md#columns)
* [focusable](_widgets_grid_.gridoptions.md#focusable)
* [fullSize](_widgets_grid_.gridoptions.md#fullsize)
* [height](_widgets_grid_.gridoptions.md#height)
* [line](_widgets_grid_.gridoptions.md#line)
* [rows](_widgets_grid_.gridoptions.md#rows)
* [tabIndex](_widgets_grid_.gridoptions.md#tabindex)
* [width](_widgets_grid_.gridoptions.md#width)

### Methods

* [calculateGridSpace](_widgets_grid_.gridoptions.md#calculategridspace)

---

## Properties

<a id="borderstyle"></a>

### `<Optional>` borderStyle

**● borderStyle**: *[GridBorderOptions](_widgets_grid_.gridborderoptions.md)*

*Defined in [widgets/Grid.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L17)*

Style to use for the border when enabled

___
<a id="borders"></a>

### `<Optional>` borders

**● borders**: *`boolean`*

*Defined in [widgets/Grid.ts:15](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L15)*

Borders enabled (`true`) or disabled (`false`). Disabled by default

___
<a id="col"></a>

### `<Optional>` col

**● col**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:10](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L10)*

x-position of the widget in terminal tiles

___
<a id="columns"></a>

###  columns

**● columns**: *`number`*

*Defined in [widgets/Grid.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L11)*

Number of columns of the grid

___
<a id="focusable"></a>

### `<Optional>` focusable

**● focusable**: *`boolean`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:18](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L18)*

if `true`, the widget can be selectable

___
<a id="fullsize"></a>

### `<Optional>` fullSize

**● fullSize**: *`boolean`*

*Defined in [widgets/Grid.ts:13](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L13)*

Expand (or not) to the full size of the terminal (only applies when the parent is the terminal)

___
<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:16](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L16)*

widget height in terminal tiles

___
<a id="line"></a>

### `<Optional>` line

**● line**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:12](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L12)*

y-position of the widget in terminal tiles

___
<a id="rows"></a>

###  rows

**● rows**: *`number`*

*Defined in [widgets/Grid.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L9)*

Number of rows of the grid

___
<a id="tabindex"></a>

### `<Optional>` tabIndex

**● tabIndex**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:20](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L20)*

value use for ordering the selection order with the keys

___
<a id="width"></a>

### `<Optional>` width

**● width**: *`number`*

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/Widget.ts#L14)*

widget width in terminal tiles

___

## Methods

<a id="calculategridspace"></a>

### `<Optional>` calculateGridSpace

▸ **calculateGridSpace**(available: *`number`*, cells: *`number`*, isRow: *`boolean`*, terminal: *[Terminal](../classes/_terminal_.terminal.md)*): `number`[]

*Defined in [widgets/Grid.ts:24](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L24)*

Function used to calculate the space for each grid Leave `undefined` to use the default one

It needs to return an array of the tiles where each row/column starts

**Parameters:**

| Param | Type |
| ------ | ------ |
| available | `number` |
| cells | `number` |
| isRow | `boolean` |
| terminal | [Terminal](../classes/_terminal_.terminal.md) |

**Returns:** `number`[]

___

