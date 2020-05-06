# Contribution Guide

The following contents are meant to provide an understanding of the contribution to the **mi-web-technologien-beiboot-ss2020-AnleAnja** repository and should include all required information.

## About

As part of the "Web Technologies" module, a project that deals with the development of a web application for processing images is being carried out.

![Project Screenshot](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/.github/images/about.PNG)

The project ist generally structured in two aspects: **Frontend** and **Backend**. Those aspects are represented in the folders of the repository structure. The Backend includes the backend server, which is a node.js server with express.js. The Frontend consists of a Vue.js Project with the different frontend components.

## Table of Contents

- [Project Setup](#project-setup)
  - [Install Docker and Docker Compose](#install-docker-and-docker-compose)
  - [Clone Git Repository](#clone-git-repository)
  - [Start the System](#start-the-system)
  - [URL](#url)
  - [Exit the System](#exit-the-system)
- [Code of Conduct](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md)
  - [Diversity Statement](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#diversity-statement)
  - [Expected Behaviors](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#expected-behaviors)
  - [Unacceptable Behaviors](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#unacceptable-behaviors)
  - [Reporting Issues](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#reporting-issues)
- [Contributing](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/contributing.md)
- [Conventions](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md)
  - [Git Commit Messages](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md#git-commit-messages)
  - [Issues](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/tree/master/.github/ISSUE_TEMPLATE)
  - [Code](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md#code)
- [Workflow](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/workflow.md)
- [Pull Request Template](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
- [Links](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/sources.md)

## Project Setup

The following setup guide explains in detail how to start the application using Docker

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
