[terminal-in-canvas](../README.md) > ["FocusManager"](../modules/_focusmanager_.md) > [FocusManager](../classes/_focusmanager_.focusmanager.md)



# Class: FocusManager


Manage the focus behavior around the widgets of a Terminal

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


### ⊕ **new FocusManager**(terminal: *[Terminal](_terminal_.terminal.md)*, canvas: *`HTMLCanvasElement`*): [FocusManager](_focusmanager_.focusmanager.md)


*Defined in [FocusManager.ts:17](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L17)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |
| canvas | `HTMLCanvasElement`   |  - |





**Returns:** [FocusManager](_focusmanager_.focusmanager.md)

---


## Methods
<a id="blur"></a>

###  blur

► **blur**(): `void`



*Defined in [FocusManager.ts:87](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L87)*



Remove the focus from the current focused widget




**Returns:** `void`





___

<a id="focus"></a>

###  focus

► **focus**(newWidget?: *[Widget](_widget_.widget.md)*): `void`



*Defined in [FocusManager.ts:46](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L46)*



Set the specified `newWidget` as focused, and blur the changed part of the path. Instead of setting all the previous path unfocused and then focus the new path, it just unfocus and focus the differences to avoid possible flickering


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newWidget | [Widget](_widget_.widget.md)   |  New focused widget |





**Returns:** `void`





___

<a id="getfocusedwidget"></a>

###  getFocusedWidget

► **getFocusedWidget**(): [Widget](_widget_.widget.md)



*Defined in [FocusManager.ts:96](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L96)*



Retrieve the currently focused widget




**Returns:** [Widget](_widget_.widget.md)
focused widget, or `undefined` if none






___

<a id="next"></a>

###  next

► **next**(): `void`



*Defined in [FocusManager.ts:28](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L28)*



Focus the next widget




**Returns:** `void`





___

<a id="prev"></a>

###  prev

► **prev**(): `void`



*Defined in [FocusManager.ts:35](https://github.com/danikaze/terminal-in-canvas/blob/04a5bae/src/FocusManager.ts#L35)*



Focus the previous widget




**Returns:** `void`





___


