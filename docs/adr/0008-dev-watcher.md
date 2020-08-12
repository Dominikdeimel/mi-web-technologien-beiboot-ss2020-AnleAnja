# Supervisor as a Node.js Watcher

* Status: accepted
* Date: 2020-07-17

## Context and Problem Statement

A watcher must be implemented to enable hot reloading.

## Considered Options

* chokidar
* supervisor
* nodemon

## Decision Outcome

Chosen option: "supervisor", because it outweighs the other options in their consequences

### Positive Consequences

* Good, because it's a script for nodejs
* Good, because it has a lot of additional optional parameters
* Good, because it's very well documented
* Good, because it's easy to use

## Pros and Cons of the Options

### chokidar

* Good, because it's just a wrapper around `fs.watch`, `fs.watchFile` and `FSEvents`
* Bad, because it relies on fs module
* Bad, because it works differently on MacOS than on other platforms

### supervisor

* Good, because it's a script for nodejs
* Good, because it has a lot of additional optional parameters
* Good, because it's very well documented
* Good, because it's easy to use

### nodemon

* Good, because it doesn't require additional changes to the code or method of development
* Good, because it's easy to use

## Links

* [chokidar](https://www.npmjs.com/package/chokidar)
* [supervisor](https://www.npmjs.com/package/supervisor)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [nodemon.io](https://nodemon.io/)