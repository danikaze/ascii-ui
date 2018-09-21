[terminal-in-canvas](../README.md) > ["widgets/Grid"](../modules/_widgets_grid_.md)

# External module: "widgets/Grid"

## Index

### Classes

* [Grid](../classes/_widgets_grid_.grid.md)

### Interfaces

* [AttachedWidget](../interfaces/_widgets_grid_.attachedwidget.md)
* [GridBorderOptions](../interfaces/_widgets_grid_.gridborderoptions.md)
* [GridOptions](../interfaces/_widgets_grid_.gridoptions.md)
* [TileList](../interfaces/_widgets_grid_.tilelist.md)

### Functions

* [calculateGridSpace](_widgets_grid_.md#calculategridspace)

---

## Functions

<a id="calculategridspace"></a>

###  calculateGridSpace

▸ **calculateGridSpace**(available: *`number`*, cells: *`number`*): `number`[]

*Defined in [widgets/Grid.ts:585](https://github.com/danikaze/terminal-in-canvas/blob/ad1033f/src/widgets/Grid.ts#L585)*

Function that calculates the space of each grid the most equitative way. Some cells can be bigger than others in no specific order, but with only 1 unit of difference as most.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| available | `number` |  number of tiles availables |
| cells | `number` |  number of rows/columns |

**Returns:** `number`[]
list (int[]) with the horizontal or vertical size of each grid

___

