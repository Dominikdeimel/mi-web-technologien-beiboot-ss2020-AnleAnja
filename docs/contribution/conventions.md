# Conventions

The following points describe how [Git Commit Messages](#git-commit-messages), [Issues](#issues) and [Code](#code) should be configured.

## Git Commit Messages

- **use the past tense**
```
added feature   // ok

add feature     // avoid
```
- **use the imperative mood**
```
move cursor to...   // ok

moves cursor to...  // avoid
```
- **keep it short and simple**

## Issues

Keep the configured [issue template](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/tree/master/.github/ISSUE_TEMPLATE).

## Code

Regarding coding conventions, JavaScript is the primary language in the Backend. The JavaScript framework Vue.js is used in the Frontend. This framework might get an individual convention section in the future, for now the JavaScript conventions are also applied to Vue.js.

### JavaScript

**Use 4 spaces for indentation**
```
function hello (name) {
    console.log('hi', name)
}
```
**Use single quotes for non-template strings**
```
console.log('Hello world')
```
**No unused variables**
```
function myFunction () {
    var result = something()   // avoid
}
```
**Always use `===` instead of `==`**
```
if (name === 'John')
```
**Infix operators must be spaced**
```
// ok
var x = 2
var message = 'hello, ' + name + '!'

// avoid
var x=2
var message = 'hello, '+name+'!'
```
**Commas should have a space after them**
```
// ok
var list = [1, 2, 3, 4]
function greet (name, options) { ... }

// avoid
var list = [1,2,3,4]
function greet (name,options) { ... }
```
**Opening curly braces must be placed in the same line as their related keyword**
```
if(condition){
    // ...
} else {
    // ...
}
```
**Multiple blank lines are not allowed**
```
// ok
var value = 'hello world'
console.log(value)

// avoid
var value = 'hello world'
 
 
console.log(value)
```
**Only `let` and `const` are allowed**
```
let x = 123
const y = "abc"
```
**Use camelCase when naming variables and functions**
```
function my_function () { }    // avoid
function myFunction () { }     // ok
 
var my_var = 'hello'           // avoid
var myVar = 'hello'            // ok
```
**Commas must be placed at the end of the current line**
```
var obj = {
    foo: 'foo',
    bar: 'bar'   
  }
```
**Dot should be on the same line as property**
```
console
    .log('hello')
```
