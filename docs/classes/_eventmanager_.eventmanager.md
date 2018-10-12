[ascii-ui API documentation](../README.md) > ["EventManager"](../modules/_eventmanager_.md) > [EventManager](../classes/_eventmanager_.eventmanager.md)

# Class: EventManager

Manage triggering, listening and bubbling events across the Terminal Widgets

## Hierarchy

**EventManager**

## Index

### Constructors

* [constructor](_eventmanager_.eventmanager.md#constructor)

### Methods

* [addListener](_eventmanager_.eventmanager.md#addlistener)
* [removeListener](_eventmanager_.eventmanager.md#removelistener)
* [trigger](_eventmanager_.eventmanager.md#trigger)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EventManager**(terminal: *[Terminal](_terminal_.terminal.md)*): [EventManager](_eventmanager_.eventmanager.md)

*Defined in [EventManager.ts:14](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/EventManager.ts#L14)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| terminal | [Terminal](_terminal_.terminal.md) |

**Returns:** [EventManager](_eventmanager_.eventmanager.md)

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(type: *`string`*, listener: *[EventListener](../modules/_eventmanager_.md#eventlistener)*, widget?: *[Widget](_widget_.widget.md)*): `void`

*Defined in [EventManager.ts:27](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/EventManager.ts#L27)*

Listen for events of a specific type

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  type of the event to listen to |
| listener | [EventListener](../modules/_eventmanager_.md#eventlistener) |  function to call when an event is triggered on this target |
| `Optional` widget | [Widget](_widget_.widget.md) |  widget to listen the event on (the terminal itself by default) |

**Returns:** `void`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(type: *`string`*, listener: *[EventListener](../modules/_eventmanager_.md#eventlistener)*, widget?: *[Widget](_widget_.widget.md)*): `void`

*Defined in [EventManager.ts:53](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/EventManager.ts#L53)*

Remove a previous added listener. Needs to be called with the same parameters as it was added. Does nothing if not found.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  type of the event to listen to |
| listener | [EventListener](../modules/_eventmanager_.md#eventlistener) |  function to call when an event is triggered on this target |
| `Optional` widget | [Widget](_widget_.widget.md) |  widget to listen the event on (the terminal itself by default) |

**Returns:** `void`

___
<a id="trigger"></a>

###  trigger

▸ **trigger**(event: *[TerminalEvent](_terminalevent_.terminalevent.md)*, widget?: *[Widget](_widget_.widget.md)*): `void`

*Defined in [EventManager.ts:80](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/EventManager.ts#L80)*

Trigger an event. The event will be passed to all the listeners of the target widget and then bubbled to its parent until the root terminal is reached or the event propagation is stopped (`event.stopPropagation`) by one of its listeners

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| event | [TerminalEvent](_terminalevent_.terminalevent.md) |  event to trigger |
| `Optional` widget | [Widget](_widget_.widget.md) |  widget where trigger the event (the terminal by default) |

**Returns:** `void`

___

