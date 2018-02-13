# Examples

This folder contains examples of the use of some of the code provided in this library.

While most of the functions (with their documentation) are self-explanatory, there are some other parts that could be easier to understand looking to examples.

The examples of this folders are organized in the following way:
 * Examples are grouped in folders. They can be easier to understand with several  ways of use, which can be better splitted in complete different files, included in the same directory.
 * Examples will be presented as lists of entry points below each folder when running `yarn start` reading automatically the contents of this folder.
 * A entry point will be generated for each pair of `.js` + `.html` file, so you can also add non-entry point files for your examples (i.e. shared functions or modules/classes used in the examples). If a .js file don't have its html file (same name file with html extension) it won't be shown in the index of examples.
 * The description of an example in the index page is extracted from the title of the html page for that entry point.

Example of files for this folder:

* **examples/**
  * **components/**
    * example1.js
    * example1.html
    * example2.js
    * example2.html
    * FooComponent.js
  * **slideshow/**
    * index1.js
    * index1.html
    * index2.html
  * **utils/**
    * sharedFunctions.js
    * Class1.js
    * Class2.js

When running `yarn start` it will show a site with the following index:
* **components/**
  * example1
  * example2
* **slideshow/**
  * index1

`components/example1`, `components/example2` and `slideshow/index1` are shown because there are pairs of js+html files which creates an entry point.

`component/FooComponentjs` is not shown because it has no associated .html file. As you can imagine, it's just a file used by the examples.

`slideshow/index2.html` is not shown either, because it has no .js associated file.

`utils` folder is doesn't appear because it has no entry-points inside (no js+html pairs).
