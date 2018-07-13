[terminal-in-canvas](../README.md) > ["util/tokenizer"](../modules/_util_tokenizer_.md)



# External module: "util/tokenizer"

## Index

### Interfaces

* [TextToken](../interfaces/_util_tokenizer_.texttoken.md)


### Type aliases

* [TokenizerFunction](_util_tokenizer_.md#tokenizerfunction)


### Functions

* [splitText](_util_tokenizer_.md#splittext)
* [tokenizer](_util_tokenizer_.md#tokenizer)



---
## Type aliases
<a id="tokenizerfunction"></a>

###  TokenizerFunction

**Τ TokenizerFunction**:  *`function`* 

*Defined in [util/tokenizer.ts:10](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/util/tokenizer.ts#L10)*


#### Type declaration
►(text: *`string`*): [TextToken](../interfaces/_util_tokenizer_.texttoken.md)[]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  - |





**Returns:** [TextToken](../interfaces/_util_tokenizer_.texttoken.md)[]






___


## Functions
<a id="splittext"></a>

###  splitText

► **splitText**(text: *`string`*, lineWidth: *`number`*, tknzr?: *[TokenizerFunction](_util_tokenizer_.md#tokenizerfunction)*): `string`[]



*Defined in [util/tokenizer.ts:43](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/util/tokenizer.ts#L43)*



Splits a text into different lines given a limit width


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| text | `string`  | - |   Text to split |
| lineWidth | `number`  | - |   Width of the line to calculate the number of words per line |
| tknzr | [TokenizerFunction](_util_tokenizer_.md#tokenizerfunction)  |  tokenizer |   Function to use to split the text into words |





**Returns:** `string`[]
Splitted text for each line






___

<a id="tokenizer"></a>

###  tokenizer

► **tokenizer**(text: *`string`*): [TextToken](../interfaces/_util_tokenizer_.texttoken.md)[]



*Defined in [util/tokenizer.ts:18](https://github.com/danikaze/terminal-in-canvas/blob/a39a508/src/util/tokenizer.ts#L18)*



Given a text, it will split it into words


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string`   |  Text to split |





**Returns:** [TextToken](../interfaces/_util_tokenizer_.texttoken.md)[]
text splitted into tokens






___


