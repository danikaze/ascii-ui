[terminal-in-canvas](../README.md) > ["widgets/Grid"](../modules/_widgets_grid_.md) > [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)



# Interface: GridOptions

## Hierarchy


 [WidgetOptions](_widget_.widgetoptions.md)

**↳ GridOptions**








## Properties
<a id="col"></a>

### «Optional» col

**●  col**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[col](_widget_.widgetoptions.md#col)*

*Defined in [Widget.ts:6](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L6)*



x-position of the widget in terminal tiles




___

<a id="columns"></a>

###  columns

**●  columns**:  *`number`* 

*Defined in [widgets/Grid.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L9)*



Number of columns of the grid




___

<a id="fullsize"></a>

### «Optional» fullSize

**●  fullSize**:  *`boolean`* 

*Defined in [widgets/Grid.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L11)*



Expand (or not) to the full size of the terminal




___

<a id="height"></a>

### «Optional» height

**●  height**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[height](_widget_.widgetoptions.md#height)*

*Defined in [Widget.ts:12](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L12)*



widget height in terminal tiles




___

<a id="line"></a>

### «Optional» line

**●  line**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[line](_widget_.widgetoptions.md#line)*

*Defined in [Widget.ts:8](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L8)*



y-position of the widget in terminal tiles




___

<a id="rows"></a>

###  rows

**●  rows**:  *`number`* 

*Defined in [widgets/Grid.ts:7](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L7)*



Number of rows of the grid




___

<a id="selectable"></a>

### «Optional» selectable

**●  selectable**:  *`boolean`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[selectable](_widget_.widgetoptions.md#selectable)*

*Defined in [Widget.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L14)*



if `true`, the widget can be selectable




___

<a id="tabindex"></a>

### «Optional» tabIndex

**●  tabIndex**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:16](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L16)*



value use for ordering the selection order with the keys




___

<a id="width"></a>

### «Optional» width

**●  width**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:10](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Widget.ts#L10)*



widget width in terminal tiles




___


## Methods
<a id="calculatestarts"></a>

### «Optional» calculateStarts

► **calculateStarts**(available: *`number`*, cells: *`number`*, isRow: *`boolean`*, terminal: *[Terminal](../classes/_terminal_.terminal.md)*): `number`[]



*Defined in [widgets/Grid.ts:18](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/widgets/Grid.ts#L18)*



Function used to calculate the starts of the rows/columns Leave `undefined` to use the default one

It needs to return an array of the tiles where each row/column starts


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| available | `number`   |  - |
| cells | `number`   |  - |
| isRow | `boolean`   |  - |
| terminal | [Terminal](../classes/_terminal_.terminal.md)   |  - |





**Returns:** `number`[]





___


