# Textpattern Bootstrap Templates

[![Build Status](https://img.shields.io/travis/philwareham/textpattern-bootstrap/master.svg)](https://travis-ci.org/philwareham/textpattern-bootstrap)
[![Dependency Status](http://img.shields.io/david/philwareham/textpattern-bootstrap.svg)](https://david-dm.org/philwareham/textpattern-bootstrap)
[![devDependency Status](http://img.shields.io/david/dev/philwareham/textpattern-bootstrap.svg)](https://david-dm.org/philwareham/textpattern-bootstrap?type=dev)

Demo TODO.

Textpattern templates for use with [Bootstrap](http://getbootstrap.com).

## Supported web browsers

* Internet Explorer 11.
* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.

## Requirements

Building this repository requires:

* [Node.js](http://nodejs.org/) >=0.12.0
* [Grunt](http://gruntjs.com/) >=0.4.0

## Setup

### Installing required tools

The project uses [Grunt](http://gruntjs.com/) to run tasks and [Sass](http://sass-lang.com/) for CSS pre-processing. First make sure you have base dependencies installed: [Node.js](http://nodejs.org/) and [Grunt](http://gruntjs.com/). You can install Node using the [installer](https://nodejs.org) and Grunt with npm:

```ShellSession
$ npm install -g grunt-cli
```

Consult the Grunt documentation for more instructions if necessary. You might need to use `sudo npm install -g grunt-cli` instead when installing on certain Unix-based systems.

### Installing dependencies

After you have the base dependencies taken care of, you can install the project's dependencies. Navigate to the project's directory, and run the dependency manager:

```ShellSession
$ cd textpattern-bootstrap
$ npm install
```

**npm** installs Node modules for Grunt. You might need to use `sudo npm install` instead when installing on certain Unix-based systems (you can also install via Yarn, instead of npm).

## Building

This repository hosts sources and needs to be built before it can be used. After you have installed all dependencies, you will be able to run tasks using Grunt, including building:

```ShellSession
$ grunt @task@
```

Where the `@task@` is either `build` or `watch`.

* The `build` task builds the project.
* The `watch` task will launch a task that watches for file changes; the project is then automatically built if a source file is modified.

## Updating Bootstrap

If you'd like to upgrade to a newer version of Bootstrap down the road just run:

```ShellSession
$ npm update
```

## Textpattern templates

*Currently under development.*

## License

Licensed under MIT license except Textpattern templates, which are licensed under GPLv2 license.
