# Babel for JS transpiling

* Status: accepted
* Date: 2020-07-20

## Context and Problem Statement

A transpiler is needed to convert JS code to a backward compatible version of JS that can be executed by older engines as well.

## Considered Options

* Babel
* Traceur

## Decision Outcome

Chosen option: "Babel", because it's an easy way to transpile and minify JavaScript code

### Positive Consequences

* Easy customization
* Only one framework for both transpiling and minifying
* Sufficient configuration with a babel config file

### Negative Consequences

* Overhead

## Links

* [Babel](https://babeljs.io/)
* [Traceur](https://github.com/google/traceur-compiler)
