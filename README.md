# terminal-in-canvas

There are several projects that allows you to use the JavaScript canvas in the terminal but... have you ever needed (or just wanted) to use a terminal-like interface in a HTML page (through canvas)?

No? Really, not even once? Well, I don't care about your opinion because I just wanted to create it.

And thanks to my lack of empathy this project allows you to have access to a low-level interface to modify directly a buffer to render characters like the old style terminals (_apart from the great perk of using your time to fight with this library instead of being laying in the corner of a dark street giving yourself to the drugs and alcohol_).

![Input Widget demo](assets/demo-input.gif)

You can check some prepared examples [https://terminal-in-canvas.danikaze.com](already deployed here), and [examples](check their code) to see how to use the library.

This examples can be built with the `npm run examples` or `yarn examples` command, or just be deployed in the development server via `npm run start` or `yarn start`.

Also, you can check the [docs](api documentation here), if you want to know more details about the library usage.

## Changelog

### 0.2.0

Core:
- Added support for spriteFonts (`Terminal.setImage`)
- Added `minWidth`, `minHeight`, `maxWidth` and `maxHeight` options to the `Terminal`
- Added `Widget.destruct`

Widgets:
- Added border feature in `widgets/Grid`

Others:
- Added `EventManager.removeListener` (and rename `listen` to `addListener`)
- Cleaner code with new tslint rules

### 0.1.0

First _version_ of the `Terminal` with a few widgets (`Box`, `Grid`, `Input`, `ProgressBar`, `Select`, `Text`), a `FocusManager` and an `EventManager`.

Usable but still in development, so _bugs can happen_.

