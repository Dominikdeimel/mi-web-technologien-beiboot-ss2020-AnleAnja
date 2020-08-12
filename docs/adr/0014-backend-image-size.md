# image-size as library to get size of image

* Status: accepted
* Date: 2020-08-12

## Context and Problem Statement

To add the current format of an image (portrait, landscape or square) the width and height must be extracted.

## Considered Options

* image-size
* buffer-image-size

## Decision Outcome

Chosen option: "image-size", because it's easy to use and well documented.

### Positive Consequences <!-- optional -->

* easy implementation

## Pros and Cons of the Options

### image-size

* Good, because it's easy to use
* Good, because it provides all the functionalities needed

### buffer-image-size

* Good, because it's specifically for buffers
* Good, because it's a fork of "image-size"
* Bad, because it doesn't support all features from image-size

## Links

* [image-size](https://github.com/image-size/image-size)
* [buffer-image-size](https://www.npmjs.com/package/buffer-image-size)