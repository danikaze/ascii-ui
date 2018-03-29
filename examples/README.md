# Examples

This folder contains examples of the use of some of the code provided in this project.

While most of the components (with their documentation) should be self-explanatory, there are some other parts that could be easier to understand looking to examples.

Also, this can be used to test the components and show a demo while developing them.

The examples of this folders are organized in the following way:
 * Examples are grouped in folders. They can be easier to understand with several  ways of use, which can be better splitted in complete different files, included in the same directory.
 * Examples will be presented as lists of entry points below each folder when running `yarn start` reading automatically the contents of this folder.
 * A entry point will be generated for each pair of `.ts` + `.html` file, so you can also add non-entry point files for your examples (i.e. shared functions or modules/classes used in the examples). If a .ts file don't have its html file (same name file with html extension) it won't be shown in the index of examples.
 * The description of an example in the index page is extracted from the title of the html page for that entry point.

Example of files for this folder:

* **examples/**
  * **foo/**
    * example1.ts
    * example1.html
    * example2.ts
    * example2.html
    * FooComponent.ts
  * **bar/**
    * index1.ts
    * index1.html
    * index2.html
  * **utils/**
    * sharedFunctions.ts
    * Class1.ts
    * Class2.ts

When running `yarn start` it will show a site with the following index:
* **components/**
  * example1
  * example2
* **slideshow/**
  * index1

`foo/example1`, `foo/example2` and `bar/index1` are shown because there are pairs of js+html files which creates an entry point.

`foo/FooComponentjs` is not shown because it has no associated .html file. As you can imagine, it's just a file used by the examples.

`slideshow/index2.html` is not shown either, because it has no .ts associated file.

`utils` folder doesn't appear because it has no entry-points inside (no js+html pairs).
