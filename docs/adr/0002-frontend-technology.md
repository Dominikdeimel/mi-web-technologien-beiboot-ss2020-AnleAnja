# Vue.js and Vuetify for frontend development

* Status: accepted
* Date: 2020-04-02

## Context and Problem Statement

We have to specify frameworks for frontend development, in detail a JavaScript framework and an additional design framework.

## Considered Options

### JavaScript Frameworks

* Vue.js
* Angular
* React

### Design Frameworks

* Vuetify.js
* Angular Material UI
* Material-UI

## Decision Outcome

Chosen option: Vue.js with the design framework Vuetify.js, because these are the specified frameworks for the project "Cranach Timeline".

### Positive Consequences

* practicing frameworks that are relevant for other projects
* previous experience in the usage of these frameworks
* better performance in comparison to e.g. Angular, which is able to do much more than needed in this application

### Negative Consequences

* no new frameworks to test

## Pros and Cons of the Options <!-- optional -->

### Vue.js + Vuetify.js

Vue.js is a client-side JavaScript web framework for creating single-page web applications based on the MVVM pattern. It can also be used in multipage websites for individual sections.

* Good, because it's a relatively new framework
* Good, because it's specified for the project "Cranach Timeline"
* Good, because the fact that behavior and UI are part of components makes it more intuitive
* Good, because integration of other libraries is simple
* Good, because it's very easy to learn
* Good, because of its simplicity and flexibility
* Bad, because it allows poor code

### Angular + Angular Material UI

Angular is a TypeScript-based front-end web application framework. It is developed by a community of individuals and companies, led by Google, and published as open source software.

* Good, because it has a steep learning curve
* Good, because it provides a complete solution
* Good, because it's a mature framework with good backing in terms of contributors
* Bad, because it requires learning TypeScript and MVC first

### React + Material-UI

React is a JavaScript software library that provides a basic framework for the output of user interface components from websites. Components are structured hierarchically in React and can be represented in its syntax as self-defined HTML tags.

* Good, because the documentation is thorough and complete
* Bad, because it's not a complete framework and advanced features require the use of third-party libraries

## Links

* [Vue.js](https://vuejs.org/)
* [Angular](https://angular.io/)
* [React](https://reactjs.org/)
* [Vuetify.js](https://vuetifyjs.com/de-DE/)
* [Angular Material UI](https://material.angular.io/)
* [Material-UI](https://material-ui.com/)
* [Framework Comparison](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)
