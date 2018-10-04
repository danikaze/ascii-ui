[ascii-ui API documentation](../README.md) > ["util/emptyArray"](../modules/_util_emptyarray_.md)

# External module: "util/emptyArray"

## Index

### Functions

* [emptyArray](_util_emptyarray_.md#emptyarray)

---

## Functions

<a id="emptyarray"></a>

###  emptyArray

▸ **emptyArray**<`T`>(arr: *`T`[]*): `T`[]

*Defined in [util/emptyArray.ts:8](https://github.com/danikaze/ascii-ui/blob/cfe4704/src/util/emptyArray.ts#L8)*

Empty an array without having to reassign it with `arr = []`. It's faster and preserves the same object pointer

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| arr | `T`[] |  Array to empty |

**Returns:** `T`[]
same, modified array `arr`

___

