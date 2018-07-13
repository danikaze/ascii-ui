[terminal-in-canvas](../README.md) > ["EventManager"](../modules/_eventmanager_.md) > [EventManager](../classes/_eventmanager_.eventmanager.md)



# Class: EventManager


Manage triggering, listening and bubbling events across the Terminal Widgets

## Index

### Constructors

* [constructor](_eventmanager_.eventmanager.md#constructor)


### Methods

* [listen](_eventmanager_.eventmanager.md#listen)
* [trigger](_eventmanager_.eventmanager.md#trigger)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new EventManager**(terminal: *[Terminal](_terminal_.terminal.md)*): [EventManager](_eventmanager_.eventmanager.md)


*Defined in [EventManager.ts:14](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/EventManager.ts#L14)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md)   |  - |





**Returns:** [EventManager](_eventmanager_.eventmanager.md)

---


## Methods
<a id="listen"></a>

###  listen

► **listen**(type: *`string`*, listener: *[EventListener](../modules/_eventmanager_.md#eventlistener)*, widget?: *[Widget](_widget_.widget.md)*): `void`



*Defined in [EventManager.ts:27](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/EventManager.ts#L27)*



Listen for events of a specific type


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string`   |  type of the event to listen to |
| listener | [EventListener](../modules/_eventmanager_.md#eventlistener)   |  function to call when an event is triggered on this target |
| widget | [Widget](_widget_.widget.md)   |  widget to listen the event on (the terminal itself by default) |





**Returns:** `void`





___

<a id="trigger"></a>

###  trigger

► **trigger**(event: *[TerminalEvent](_terminalevent_.terminalevent.md)*, widget?: *[Widget](_widget_.widget.md)*): `void`



*Defined in [EventManager.ts:52](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/EventManager.ts#L52)*



Trigger an event. The event will be passed to all the listeners of the target widget and then bubbled to its parent until the root terminal is reached or the event propagation is stopped (`event.stopPropagation`) by one of its listeners


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | [TerminalEvent](_terminalevent_.terminalevent.md)   |  event to trigger |
| widget | [Widget](_widget_.widget.md)   |  widget where trigger the event (the terminal by default) |





**Returns:** `void`





___


