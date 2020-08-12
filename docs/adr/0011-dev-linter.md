# ESLint as Linter

* Status: accepted
* Date: 2020-07-14

## Context and Problem Statement

To maintain a high quality code, a linter should be added. A linter checks written code along some predefined coding ruleset.

## Considered Options

* JSLint
* JSHint
* JSCS
* ESLint

## Decision Outcome

Chosen option: "ESLint", because it has almost only pros and has been used before.

### Positive Consequences

* Experience
* The config file from previous experience can be reused

### Negative Consequences

* Not a new technology to learn

## Pros and Cons of the Options

### JSLint

* Good, because it comes configured and ready to go
* Bad, because it doesn't have a configuration file
* Bad, because of the limited number of configuration options
* Bad, because many rules cannot be disabled
* Bad, because custom rules can't be added

### JSHint

* Good, because it supports a configuration file, making it easier to use in larger projects
* Good, because it has support for many libraries out of the box
* Bad, because it's difficult to know which rule is causing an error
* Bad, because there's no custom rule support

### JSCS

* Good, because it supports custom reporters
* Good, because presets and ready-made configuration files can make it easy to set up
* Good, because it has a flag to include rule names in reports
* Good, because it can be extended with custom plugins
* Bad, because it only detects coding style violations
* Bad, because it's slow

### ESLint

* Good, because it's flexible
* Good, because any rule can be toggled, and many rules have extra settings that can be tweaked
* Good, because it's very extensible and has many plugins available
* Good, because the output is very easy to understand
* Good, because it includes many rules not available in other linters
* Good, because it supports custom reporters
* Bad, because it requires some configuration

## Links

* [Comparison](https://www.sitepoint.com/comparison-javascript-linting-tools/)
* [JSLint](https://jslint.com/)
* [JSHint](https://jshint.com/)
* [JSCS](https://jscs-dev.github.io/)
* [ESLint](https://eslint.org/)