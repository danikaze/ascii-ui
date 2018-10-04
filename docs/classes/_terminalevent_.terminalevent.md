[ascii-ui API documentation](../README.md) > ["TerminalEvent"](../modules/_terminalevent_.md) > [TerminalEvent](../classes/_terminalevent_.terminalevent.md)

# Class: TerminalEvent

Type of Events that can be triggered on Terminal's widgets, and bubble through it using an `EventManager`

## Hierarchy

**TerminalEvent**

## Index

### Constructors

* [constructor](_terminalevent_.terminalevent.md#constructor)

### Properties

* [data](_terminalevent_.terminalevent.md#data)
* [type](_terminalevent_.terminalevent.md#type)

### Methods

* [isCancelled](_terminalevent_.terminalevent.md#iscancelled)
* [stopPropagation](_terminalevent_.terminalevent.md#stoppropagation)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TerminalEvent**(options: * [EventOptions](../interfaces/_terminalevent_.eventoptions.md) &#124; `string`*, data?: *`any`*): [TerminalEvent](_terminalevent_.terminalevent.md)

*Defined in [TerminalEvent.ts:18](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/TerminalEvent.ts#L18)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| options |  [EventOptions](../interfaces/_terminalevent_.eventoptions.md) &#124; `string`|
| `Optional` data | `any` |

**Returns:** [TerminalEvent](_terminalevent_.terminalevent.md)

___

## Properties

<a id="data"></a>

###  data

**● data**: *`any`*

*Defined in [TerminalEvent.ts:13](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/TerminalEvent.ts#L13)*

Data that can be passed from the trigger moment to the listeners

___
<a id="type"></a>

###  type

**● type**: *`string`*

*Defined in [TerminalEvent.ts:11](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/TerminalEvent.ts#L11)*

Event type. Used to listen for this kind of events when triggered

___

## Methods

<a id="iscancelled"></a>

###  isCancelled

▸ **isCancelled**(): `boolean`

*Defined in [TerminalEvent.ts:47](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/TerminalEvent.ts#L47)*

Check if the event is still propagating

**Returns:** `boolean`
`true` if still propagating, `false` if `stopPropagation()` was called

___
<a id="stoppropagation"></a>

###  stopPropagation

▸ **stopPropagation**(): `void`

*Defined in [TerminalEvent.ts:36](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/TerminalEvent.ts#L36)*

Stops the propagation of the event. Called from a listener so the event is not passed to the next one.

**Returns:** `void`

___

