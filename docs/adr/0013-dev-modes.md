# Multiple docker-compose files for different modes

* Status: accepted
* Date: 2020-08-02

## Context and Problem Statement

a second frontend development environment is to be implemented.
The deployment is to be done via a Docker Container and includes the options of a development and production mode.

## Considered Options

* Multiple docker-compose files
* Environment variables

## Decision Outcome

Chosen option: The multiple docker-compose files, because the implementation and usage are easier.

## Pros and Cons of the Options

### Multiple docker compose files

* Good, because of previous experience with the docker-compose files
* Good, because it provides an easy solution to add more modes in the future
* Good, because starting the modes is very easy

### Environment variables

* Good, because everything is combined in one file
* Bad, because there's no  prior experience with environment variables

## Links

* [Share Compose configurations between files and projects](https://docs.docker.com/compose/extends/)
* [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/)