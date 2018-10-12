[ascii-ui API documentation](../README.md) > ["util/requestAnimationFrame"](../modules/_util_requestanimationframe_.md)

# External module: "util/requestAnimationFrame"

## Index

### Type aliases

* [requestAnimationFrameFn](_util_requestanimationframe_.md#requestanimationframefn)

### Variables

* [requestAnimationFrame](_util_requestanimationframe_.md#requestanimationframe)

---

## Type aliases

<a id="requestanimationframefn"></a>

###  requestAnimationFrameFn

**Ƭ requestAnimationFrameFn**: *`function`*

*Defined in [util/requestAnimationFrame.ts:1](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/util/requestAnimationFrame.ts#L1)*

#### Type declaration
▸(callback: *`FrameRequestCallback`*): `number`

**Parameters:**

| Param | Type |
| ------ | ------ |
| callback | `FrameRequestCallback` |

**Returns:** `number`

___

## Variables

<a id="requestanimationframe"></a>

### `<Const>` requestAnimationFrame

**● requestAnimationFrame**: *[requestAnimationFrameFn](_util_requestanimationframe_.md#requestanimationframefn)* =  window.requestAnimationFrame.bind(window) ||
  window.webkitRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).mozRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).oRequestAnimationFrame.bind(window) ||
  (window as VendorWindow).msRequestAnimationFrame.bind(window) ||
  customRequestAnimationFrame

*Defined in [util/requestAnimationFrame.ts:22](https://github.com/danikaze/ascii-ui/blob/da18f7c/src/util/requestAnimationFrame.ts#L22)*

___

