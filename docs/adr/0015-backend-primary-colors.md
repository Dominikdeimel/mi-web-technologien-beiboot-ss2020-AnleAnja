# node-vibrant as library for extracting colors

* Status: supersedes [ADR-0003](0003-image-manipulation.md)
* Date: 2020-08-12

## Context and Problem Statement

The module chosen in [ADR-0003](0003-image-manipulation.md) does not sort the colors by frequency. For this reason, an alternative must be sought.

## Considered Options

* node-vibrant
* splashy

## Decision Outcome

Chosen option: "node-vibrant", because it provides all the information needed and is easy to implement.

### Positive Consequences

* provides all the information needed
* easy to implement

### Negative Consequences

* additional time needed to adjust the code

### node-vibrant

* Good, because it provides the population to every primary colour
* Good, because it's easy to implement
* Bad, because additional time is needed to change the current module and adjust the code

### splashy

* Good, because it's already implemented
* Good, because the usage is short and simple
* Bad, because the order of the colours is not sorted by frequency

## Links

* [node-vibrant](https://www.npmjs.com/package/node-vibrant)
* [splashy](https://www.npmjs.com/package/splashy)