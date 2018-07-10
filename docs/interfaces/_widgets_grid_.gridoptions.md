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

*Defined in [Widget.ts:7](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L7)*



x-position of the widget in terminal tiles




___

<a id="columns"></a>

###  columns

**●  columns**:  *`number`* 

*Defined in [widgets/Grid.ts:12](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Grid.ts#L12)*



Number of columns of the grid




___

<a id="focusable"></a>

### «Optional» focusable

**●  focusable**:  *`boolean`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[focusable](_widget_.widgetoptions.md#focusable)*

*Defined in [Widget.ts:15](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L15)*



if `true`, the widget can be selectable




___

<a id="fullsize"></a>

### «Optional» fullSize

**●  fullSize**:  *`boolean`* 

*Defined in [widgets/Grid.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Grid.ts#L14)*



Expand (or not) to the full size of the terminal (only applies when the parent is the terminal)




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

<a id="rows"></a>

###  rows

**●  rows**:  *`number`* 

*Defined in [widgets/Grid.ts:10](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Grid.ts#L10)*



Number of rows of the grid




___

<a id="tabindex"></a>

### «Optional» tabIndex

**●  tabIndex**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[tabIndex](_widget_.widgetoptions.md#tabindex)*

*Defined in [Widget.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L17)*



value use for ordering the selection order with the keys




___

<a id="width"></a>

### «Optional» width

**●  width**:  *`number`* 

*Inherited from [WidgetOptions](_widget_.widgetoptions.md).[width](_widget_.widgetoptions.md#width)*

*Defined in [Widget.ts:11](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/Widget.ts#L11)*



widget width in terminal tiles




___


## Methods
<a id="calculatestarts"></a>

### «Optional» calculateStarts

► **calculateStarts**(available: *`number`*, cells: *`number`*, isRow: *`boolean`*, terminal: *[Terminal](../classes/_terminal_.terminal.md)*): `number`[]



*Defined in [widgets/Grid.ts:21](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/widgets/Grid.ts#L21)*



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


