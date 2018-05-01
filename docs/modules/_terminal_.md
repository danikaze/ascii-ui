[terminal-in-canvas](../README.md) > ["Terminal"](../modules/_terminal_.md)



# External module: "Terminal"

## Index

### Enumerations

* [TerminalEvent](../enums/_terminal_.terminalevent.md)


### Classes

* [Terminal](../classes/_terminal_.terminal.md)


### Interfaces

* [CharStyle](../interfaces/_terminal_.charstyle.md)
* [DebugOptions](../interfaces/_terminal_.debugoptions.md)
* [DecayTile](../interfaces/_terminal_.decaytile.md)
* [InternalTile](../interfaces/_terminal_.internaltile.md)
* [TerminalOptions](../interfaces/_terminal_.terminaloptions.md)
* [TerminalSize](../interfaces/_terminal_.terminalsize.md)
* [Tile](../interfaces/_terminal_.tile.md)
* [TilePosition](../interfaces/_terminal_.tileposition.md)
* [ViewPortOptions](../interfaces/_terminal_.viewportoptions.md)


### Type aliases

* [EscapeCallback](_terminal_.md#escapecallback)
* [EventListener](_terminal_.md#eventlistener)
* [IterateTileCallback](_terminal_.md#iteratetilecallback)



---
## Type aliases
<a id="escapecallback"></a>

###  EscapeCallback

**Τ EscapeCallback**:  *`function`* 

*Defined in [Terminal.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L22)*



Function called when the matching command is found
*__param__*: The whole text

*__param__*: Position of the matching commmand in the text

*__returns__*: index where the text processing should be continued


#### Type declaration
►(text: *`string`*, index: *`number`*): `number`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  - |
| index | `number`   |  - |





**Returns:** `number`






___

<a id="eventlistener"></a>

###  EventListener

**Τ EventListener**:  *`function`* 

*Defined in [Terminal.ts:110](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L110)*


#### Type declaration
►(...args: *`any`[]*): `void`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| args | `any`[]   |  - |





**Returns:** `void`






___

<a id="iteratetilecallback"></a>

###  IterateTileCallback

**Τ IterateTileCallback**:  *`function`* 

*Defined in [Terminal.ts:131](https://github.com/danikaze/terminal-in-canvas/blob/6c46a1f/src/Terminal.ts#L131)*


#### Type declaration
►(InternalTile: *`any`*, i: *`any`*): `void`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| InternalTile | `any`   |  - |
| i | `any`   |  - |





**Returns:** `void`






___


