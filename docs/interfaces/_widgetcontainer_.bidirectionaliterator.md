[terminal-in-canvas](../README.md) > ["WidgetContainer"](../modules/_widgetcontainer_.md) > [BidirectionalIterator](../interfaces/_widgetcontainer_.bidirectionaliterator.md)



# Interface: BidirectionalIterator


Extended Iterator interface that will return a `next` and a `prev` methods.

## Type parameters
#### T 
## Hierarchy


 `Iterator`.<`T`>

**↳ BidirectionalIterator**








## Methods
<a id="next"></a>

###  next

► **next**(value?: *`any`*): `IteratorResult`.<`T`>



*Inherited from Iterator.next*

*Overrides Iterator.next*

*Defined in /Users/daniel.berlanga/Dev/other/terminal-in-canvas/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:4791*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `IteratorResult`.<`T`>





___

<a id="prev"></a>

###  prev

► **prev**(): `IteratorResult`.<`T`>



*Defined in [WidgetContainer.ts:8](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/WidgetContainer.ts#L8)*





**Returns:** `IteratorResult`.<`T`>





___

<a id="return"></a>

### «Optional» return

► **return**(value?: *`any`*): `IteratorResult`.<`T`>



*Inherited from Iterator.return*

*Defined in /Users/daniel.berlanga/Dev/other/terminal-in-canvas/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:4792*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `IteratorResult`.<`T`>





___

<a id="seek"></a>

###  seek

► **seek**(value?: *`T`⎮`number`*): `void`



*Defined in [WidgetContainer.ts:9](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/WidgetContainer.ts#L9)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T`⎮`number`   |  - |





**Returns:** `void`





___

<a id="throw"></a>

### «Optional» throw

► **throw**(e?: *`any`*): `IteratorResult`.<`T`>



*Inherited from Iterator.throw*

*Defined in /Users/daniel.berlanga/Dev/other/terminal-in-canvas/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:4793*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `any`   |  - |





**Returns:** `IteratorResult`.<`T`>





___


