# Conventions

The following points describe how [Git Commit Messages](#git-commit-messages), [Issues](#issues) and [Code](#code) should be configured.

## Git Commit Messages

- **use the present tense**
```
add feature     // ok

added feature   // avoid
```
- **use the imperative**
```
move cursor to...   // ok

moves cursor to...  // avoid
```
- **keep it short and simple**

## Issues

Keep the configured [issue template](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/tree/master/.github/ISSUE_TEMPLATE).

## Documentation

All architectural or design decisions have to be documented using [ADR](https://adr.github.io/). Every documentation file uses the [Template](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/adr/template.md) as a base and is integrated in the [Index](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/adr/index.md) as soon as the file is completed. The ADR documentation is written in Markdown. It's important to document every decision so that everyone can retrace the evaluation and take a look at the considered decisions.

The naming of the individual files should follow this pattern: **"0001-general-topic.md"**

## Code

Regarding coding conventions, JavaScript is the primary language in the Backend. The JavaScript framework Vue.js is used in the Frontend. This framework might get an individual convention section in the future, for now the JavaScript conventions are also applied to Vue.js.

### JavaScript

#### General rules

##### Use single quotes for non-template strings

```js
console.log('Hello world')
```

##### Always use `===` instead of `==`
```js
if (name === 'John')
```

#### Indentation and spaces

##### Use 4 spaces for indentation
```js
function hello (name) {
    console.log('hi', name)
}
```

##### Infix operators must be spaced
```js
// ok
let x = 2
let message = 'hello, ' + name + '!'

// avoid
let x=2
let message = 'hello, '+name+'!'
```

##### Commas should have a space after them
```js
// ok
let list = [1, 2, 3, 4]
function greet (name, options) { ... }

// avoid
let list = [1,2,3,4]
function greet (name,options) { ... }
```

##### Multiple blank lines are not allowed
```js
// ok
let value = 'hello world'
console.log(value)

// avoid
let value = 'hello world'
 
 
console.log(value)
```

#### Variables

##### No unused variables
```js
function myFunction () {
    let result = something()   // avoid
}
```

##### Only `let` and `const` are allowed
```js
let x = 123
const y = "abc"
```

##### Use camelCase when naming variables and functions
```js
function my_function () { }    // avoid
function myFunction () { }     // ok
 
let my_let = 'hello'           // avoid
let myLet = 'hello'            // ok
```

#### Code format

##### Opening curly braces must be placed in the same line as their related keyword
```js
if(condition) {
    // ...
} else {
    // ...
}
```

##### Commas must be placed at the end of the current line
```js
let obj = {
    foo: 'foo',
    bar: 'bar'   
  }
```

##### Dot should be on the same line as property except for chained method calls
```js
console
    .log('hello')
    
builder.start()
    .addSomething()
    .addSomethingElse()
    .build();
```
