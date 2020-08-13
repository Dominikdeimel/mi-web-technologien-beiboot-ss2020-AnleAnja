# Development Environment "dev"

With "dev" a decoupled, development-ready docker container for frontend development is provided for a frontend development team.

![Dev](https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja/blob/master/.github/images/dev.PNG)

There is a stand-alone docker container that runs Node.js. It can access the REST API of the project via http. A BuildChain with SASS Pipeline, Linter, Transpiler and Minification is implemented. Furthermore there is Hot Reload, a reasonable, state-of-the-art folder structure and a WebServer for the frontend code.

## Development Mode

In development mode, you can work directly in the container, so that the container does not have to be restarted when changes are made.

## Production Mode

If you don't want to work on the code and simply want to execute the finished application, the production mode is used.

## Setup with Docker

The following setup guide explains in detail how to start the application using Docker

### Install Docker and Docker Compose
* Docker & Docker Compose for [Windows](https://docs.docker.com/docker-for-windows/install/)
* Docker & Docker Compose for [macOS](https://docs.docker.com/docker-for-mac/install/)
* [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) &
[Docker Compose](https://docs.docker.com/compose/install/#install-compose) for Ubuntu
  
### Clone Git Repository
`git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2020-AnleAnja`

### Start the System

* Switch to the right folder
  * `cd Frontend/dev/.docker`
* Start **development** mode
  * `docker-compose -f docker-compose.yml -f development.yml up -d`
* Start **production** mode
  * `docker-compose -f docker-compose.yml -f production.yml up -d`

### URL

The System ist available at: http://localhost:8080
    
### Exit the System
    
`docker-compose down`
