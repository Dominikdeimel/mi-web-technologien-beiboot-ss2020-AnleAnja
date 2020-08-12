# sharp and splashy as libraries for image manipulation

* Status: accepted
* Date: 2020-04-15

## Context and Problem Statement

Uploaded images should be resized as well as scaled. The exact measurements are configurable. Furthermore, the primary colors of an image have to be displayed and saved. For this, specific libraries are to be used via npm.

## Considered Options

### Resizing images

* jimp
* sharp

### Extracting colors

* get-image-colors
* img-color-extractor
* splashy

## Decision Outcome

Chosen option: "sharp" and "splashy", because these libraries fulfill all requirements given (see below).

### Positive Consequences

* sharp provides the option to sharpen or soften images, which is a requirement for the application
* splashy is easy to use and comes with the needed inputs and outputs

### Negative Consequences <!-- optional -->

* sharp is not as simple as jimp

## Pros and Cons of the Options for resizing images

### jimp

JavaScript Image Manipulation Program

* Good, because it has zero native dependencies
* Good, because it provides many options to resize images
* Bad, because it doesn't provide the option to sharpen or soften images

### sharp

* Good, because it provides many options for resizing, rotating, extracting, compositing and gamma correcting images
* Bad, because it doesn't automatically save the orientation of images

## Pros and Cons of the Options for extracting colors

### get-image-colors

* Good, because it provides a customizable color format
* Good, because it also works with node-style callbacks
* Bad, because it has a lot of dependencies

### img-color-extractor

* Good, because it provides the real colors and doesn't interpolate them
* Good, because it has a lot of options and features
* Bad, because it's not very well documented
* Bad, because the usage is more complicated than other libraries

### splashy

* Good, because the input can be either an url, or a buffer
* Good, because the usage is short and simple

## Links

* [jimp](https://www.npmjs.com/package/jimp)
* [sharp](https://www.npmjs.com/package/sharp)
* [get-image-colors](https://www.npmjs.com/package/get-image-colors)
* [img-color-extractor](https://www.npmjs.com/package/img-color-extractor)
* [splashy](https://www.npmjs.com/package/splashy)
