# Contribution Guide

The following contents are meant to provide an understanding of the contribution to the **mi-web-technologien-beiboot-ss2020-AnleAnja** repository and should include all required information.

## About

This project, which was implemented as part of the module "Web Technologies", deals with the development of a web application for processing images.

![Project Screenshot](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/.github/images/about.PNG)

The project ist generally structured in two aspects: **Frontend** and **Backend**. Those aspects are represented in the folders of the repository structure. The Backend includes the image persistance and image processing, which is implemented with a Node.js server using express.js. The Frontend consists of a http server that listens on port `8080`. On `/`, there is a Vue.js application that represents the frontend.

## Table of Contents

- [Docker Setup](#docker-setup)
  - [Install Docker and Docker Compose](#install-docker-and-docker-compose)
  - [Clone Git Repository](#clone-git-repository)
  - [Start the System](#start-the-system)
    - [Scaffolding](#scaffolding)
  - [URL](#url)
  - [Exit the System](#exit-the-system)
- [Local Setup](#local-setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Code of Conduct](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md)
  - [Diversity Statement](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#diversity-statement)
  - [Expected Behaviors](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#expected-behaviors)
  - [Unacceptable Behaviors](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#unacceptable-behaviors)
  - [Reporting Issues](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/code-of-conduct.md#reporting-issues)
- [Contributing](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/contributing.md)
- [Conventions](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md)
  - [Git Commit Messages](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md#git-commit-messages)
  - [Issues](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/tree/master/.github/ISSUE_TEMPLATE)
  - [Documentation](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md#documentation)
  - [Code](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/conventions.md#code)
- [Workflow](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/workflow.md)
- [Pull Request Template](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
- [Links](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/docs/contribution/sources.md)

## Docker Setup

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

### Scaffolding

Sets up a data folder with 31 image records. The images are provided by [Unplash](https://unsplash.com/).

* `docker ps`
* copy the Backend **CONTAINER ID**
* `docker cp ./Scaffolding/data <CONTAINER ID>:/app/`
    
### URL

The System ist available at: http://localhost:8080
    
### Exit the System
    
`docker-compose down`

## Local Setup

The following setup guide explains how to start the application without Docker

### Frontend

* `cd Frontend/Frontend`

* Follow [this](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/Frontend/frontend/README.md) setup guide

* Access the application at http://localhost:8080

### Backend

* `cd Backend`

* `npm install`

* `cd src`

* `node backend.js`
