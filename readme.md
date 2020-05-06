# Contribution Guide

[introduction]

## Table of Contents

- [About](#about)
- [Project Setup](#project-setup)
  - [Install Docker and Docker Compose](#install-docker-and-docker-compose)
  - [Clone Git Repository](#clone-git-repository)
  - [Start the System](#start-the-system)
  - [URL](#url)
  - [Exit the System](#exit-the-system)
- [Code of Conduct](#code-of-conduct)
  - [Diversity Statement](#diversity-statement)
  - [Expected Behaviors](#expected-behaviors)
  - [Unacceptable Behaviors](#unacceptable-behaviors)
  - [Reporting Issues](#reporting-issues)
- [Contributing](#contributing)
- [Conventions](#conventions)
  - [Git Commit Messages](#git-commit-messages)
  - [Issues](#issues)
  - [Code](#code)
- [Workflow](#workflow)
- [Pull Request Template](#pull-request-template)
- [Links](#links)

## About

[text]

## Project Setup

[introduction]

### Install Docker and Docker Compose
* Docker & Docker Compose for [Windows](https://docs.docker.com/docker-for-windows/install/)
* Docker & Docker Compose for [macOS](https://docs.docker.com/docker-for-mac/install/)
* [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) &
[Docker Compose](https://docs.docker.com/compose/install/#install-compose) for Ubuntu
  
### Clone Git Repository
`git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja`

### Start the System

`docker-compose up -d`
    
### URL

The System ist available at: http://localhost:8080
    
### Exit the System
    
`docker-compose down`

## Code of Conduct

This Code of Conduct outlines our expectations for participants within the
**mi-web-technologien-beiboot-ss2020-AnleAnja** community as well as steps to reporting unacceptable
behavior. Our goal is to make explicit what we expect from participants in this community as well as its
leaders.

### Diversity Statement

Open Source projects thrive on diverse perspectives. Complex projects require diverse perspectives which
you only get when you invite dissimilar people to participate in the group. When you bring people from
different backgrounds together on complex projects tensions arise, sometimes leading to verbal abuse and
even threats of violence. Establishing a Code of Conduct is one way to signify this project values the
perspectives of many. We are committed to ensuring participants have an effective method of escalating 
reports of misconduct so that we can maintain a productive community for all participants.

### Expected Behaviors

We expect participants in this community to conduct themselves professionally. Since our primary mode of
communication is text on an online forum (e.g. issue, pull request, comment) devoid of vocal tone,
gestures, or other context that is often vital to understanding, it is especially important to convey
these attitudes in text. This includes the following behaviors:

- Using welcoming and inclusive language
- Being friendly and patient
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members
- Kind to beginners
- Choosing words carefully

### Unacceptable Behaviors

Participants in this open source community remain in good standing when they do not conduct themselves
in a manner that violates this Code of Conduct. Misconduct includes:

- Calling out project members by their identity or background in a deliberately negative or insulting
manner. This includes but is not limited to slurs or insinuations related to protected or suspect
classes such as race, color, citizenship, national origin, political belief, religion,
sexual orientation, gender identity and expression, age, size, culture, ethnicity, genetic features,
language, profession, membership of a national minority, mental or physical ability.
- Insulting remarks about a person’s lifestyle practices.
- Threats of violence or intimidation or any project member.
- Unwanted sexual attention or behavior unsuitable for the topic of the open source project.
- Sustained disruption of discussion.

We cannot list all forms of harassment in an exhaustive manner, nor do we seek to declare some forms of
harassment as benign or not worthy of action. Rather, if a project member feels harassed we ask they
report the incident. The incident will be recorded and addressed. Furthermore, we insist that the
victim of this harassment not address the issue in the forum in public, as this tends to intensify the
problem for the parties in question and for the community as a whole.

### Reporting Issues

If you experience or witness misconduct, or have any other concerns about the conduct of members of this
project, please report it by contacting us via [Mail](mailto:anja_katharina.bertels@smail.th-koeln.de).
All reports will be handled with discretion.

## Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Conventions

[introduction]

### Git Commit Messages

- use the past tense
- use the imperative mood
- keep it short and simple

### Issues

Keep the configured issue template [issue template]

### Code

#### JavaScript

- Use 4 spaces for indentation
- Use single quotes for non-template strings
- No unused variables
- Always use `===` instead of `==`
- Infix operators must be spaced
- Commas should have a space after them
- Opening curly braces must be placed in the same line as their related keyword
- Multiple blank lines are not allowed
- Only `let` and `const` are allowed
- Use camelCase when naming variables and functions
- Commas must be placed at the end of the current line
- Dot should be on the same line as property

## Workflow

- A `develop` branch is created from `master`
- `feature` branches are created from `develop`
- When a `feature` is completed it is merged into the `develop` branch
- When a milestone is completed, the current commit of the `develop` branch receives a Release-Candidate Tag and 
is used for testing
- In case issues emerge on a release candidate, they are documented as a bug and developed just like a feature with
high priority. Upon resolving of all issues the version is tagged as a new release candidate for another testing run.
- When testing is successful, the release candidate will be merged into the master (no fast-forward)
- Issues in `master` are documented and resolved in the next milestone, except for hotfixes which are
  - issues that prevent the application from being used
  - major issues that can be resolved without risking to break something else
- `hotfix` branches are created from `master`
- Once the `hotfix` is completed it is merged to both `develop` and `master`

## Pull Request Template

Keep the configured pull request template [pull request template]

## Links

- [Setting guidelines for repository contributors](https://help.github.com/en/github/building-a-strong-community/setting-guidelines-for-repository-contributors)
- [Code of Conduct](https://github.com/todogroup/opencodeofconduct/blob/gh-pages/codeofconduct_redo.md)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [JavaScript Conventions](https://standardjs.com/rules.html)
- [GitHub Templates](https://github.com/stevemao/github-issue-templates)
- [About issue and pull request templates](https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates)
- [Issue Template](https://github.com/angular-translate/angular-translate/blob/master/.github/ISSUE_TEMPLATE.md)
- [Issue Template](https://github.com/bchavez/RethinkDb.Driver/blob/master/.github/ISSUE_TEMPLATE/02_feature_request.md
)
- [Pull Request Template](https://github.com/ionic-team/ionic/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
