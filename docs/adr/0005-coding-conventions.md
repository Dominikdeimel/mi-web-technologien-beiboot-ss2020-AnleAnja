# JavaScript Standard Style + self written additions for coding conventions

* Status: accepted
* Date: 2020-05-06

## Context and Problem Statement

Code conventions improve the readability of the software, allowing contributors to understand new code more quickly and thoroughly.

## Considered Options

* self written coding conventions
* JavaScript Standard Style 

## Decision Outcome

Chosen option: a combination of "JavaScript Standard Style" and self written coding conventions. The JavaScript Standard 
Style conventions are used as a base and completed with self written elements. Furthermore, ESLint is implemented to 
check the coding conventions.

## Pros and Cons of the Options

### self written coding conventions

* Good, because it's the most customizable it can get
* Bad, because it's very time-consuming

### JavaScript Standard Style

* Good, because the standard JavaScript rules are the most common coding conventions for JavaScript, so the contributors 
might already be familiar with them
* Bad, because some rules might not apply to the previous code style and lead to many time-consuming changes in the code

## Links

* [JavaScript Standard Style](https://standardjs.com/rules.html)
* [ESLint User Guide](https://eslint.org/docs/user-guide/getting-started)
