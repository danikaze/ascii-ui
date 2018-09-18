[terminal-in-canvas](../README.md) > ["util/requestAnimationFrame"](../modules/_util_requestanimationframe_.md)

# External module: "util/requestAnimationFrame"

## Index

### Interfaces

* [VendorWindow](../interfaces/_util_requestanimationframe_.vendorwindow.md)

### Type aliases

* [requestAnimationFrameFn](_util_requestanimationframe_.md#requestanimationframefn)

### Variables

* [requestAnimationFrame](_util_requestanimationframe_.md#requestanimationframe)

### Functions

* [customRequestAnimationFrame](_util_requestanimationframe_.md#customrequestanimationframe)

---

## Type aliases

<a id="requestanimationframefn"></a>

###  requestAnimationFrameFn

**ΤrequestAnimationFrameFn**: *`function`*

*Defined in [util/requestAnimationFrame.ts:1](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/util/requestAnimationFrame.ts#L1)*

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

*Defined in [util/requestAnimationFrame.ts:22](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/util/requestAnimationFrame.ts#L22)*

___

## Functions

<a id="customrequestanimationframe"></a>

###  customRequestAnimationFrame

▸ **customRequestAnimationFrame**(callback: *`FrameRequestCallback`*): `number`

*Defined in [util/requestAnimationFrame.ts:12](https://github.com/danikaze/terminal-in-canvas/blob/13134dd/src/util/requestAnimationFrame.ts#L12)*

Polyfill for `window.requestAnimationFrame`

**Parameters:**

| Param | Type |
| ------ | ------ |
| callback | `FrameRequestCallback` |

**Returns:** `number`

___

