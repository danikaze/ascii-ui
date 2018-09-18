[terminal-in-canvas](../README.md) > ["FocusManager"](../modules/_focusmanager_.md) > [FocusManager](../classes/_focusmanager_.focusmanager.md)

# Class: FocusManager

Manage the focus behavior around the widgets of a Terminal

## Hierarchy

**FocusManager**

## Index

### Constructors

* [constructor](_focusmanager_.focusmanager.md#constructor)

### Methods

* [blur](_focusmanager_.focusmanager.md#blur)
* [focus](_focusmanager_.focusmanager.md#focus)
* [getFocusedWidget](_focusmanager_.focusmanager.md#getfocusedwidget)
* [next](_focusmanager_.focusmanager.md#next)
* [prev](_focusmanager_.focusmanager.md#prev)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FocusManager**(terminal: *[Terminal](_terminal_.terminal.md)*, canvas: *`HTMLCanvasElement`*): [FocusManager](_focusmanager_.focusmanager.md)

*Defined in [FocusManager.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L17)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |
| canvas | `HTMLCanvasElement` |

**Returns:** [FocusManager](_focusmanager_.focusmanager.md)

___

## Methods

<a id="blur"></a>

###  blur

▸ **blur**(): `boolean`

*Defined in [FocusManager.ts:93](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L93)*

Remove the focus from the current focused widget

**Returns:** `boolean`
`true` if the focus changed

___
<a id="focus"></a>

###  focus

▸ **focus**(newWidget?: *[Widget](_widget_.widget.md)*): `boolean`

*Defined in [FocusManager.ts:47](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L47)*

Set the specified `newWidget` as focused, and blur the changed part of the path. Instead of setting all the previous path unfocused and then focus the new path, it just unfocus and focus the differences to avoid possible flickering

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` newWidget | [Widget](_widget_.widget.md) |  New widget to focus |

**Returns:** `boolean`
`true` if the focus changed

___
<a id="getfocusedwidget"></a>

###  getFocusedWidget

▸ **getFocusedWidget**(): [Widget](_widget_.widget.md)

*Defined in [FocusManager.ts:102](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L102)*

Retrieve the currently focused widget

**Returns:** [Widget](_widget_.widget.md)
focused widget, or `undefined` if none

___
<a id="next"></a>

###  next

▸ **next**(): `void`

*Defined in [FocusManager.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L28)*

Focus the next widget

**Returns:** `void`

___
<a id="prev"></a>

###  prev

▸ **prev**(): `void`

*Defined in [FocusManager.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/FocusManager.ts#L35)*

Focus the previous widget

**Returns:** `void`

___

