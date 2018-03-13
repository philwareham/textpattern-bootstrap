# Textpattern Bootstrap Templates

[![Greenkeeper badge](https://badges.greenkeeper.io/philwareham/textpattern-bootstrap.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/philwareham/textpattern-bootstrap/master.svg)](https://travis-ci.org/philwareham/textpattern-bootstrap)

[Demo](http://bootstrap.philwareham.co.uk/).

Textpattern templates for use with [Bootstrap](http://getbootstrap.com) v4. **Currently under development.**

## Supported web browsers

* Internet Explorer 11.
* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.

## Requirements

Building this repository requires:

* [Node.js](https://nodejs.org/) >=6.9

## Build setup

### Installing required tools

The project uses [Webpack](https://webpack.github.io/) to run tasks and [Sass](http://sass-lang.com/) for CSS pre-processing. First make sure you have a recent version of [Node.js](https://nodejs.org/) installed. You can install Node.js using the [installer](https://nodejs.org/en/download/) or [package manager](https://nodejs.org/en/download/package-manager/).

### Installing dependencies

After you have Node.js taken care of, you can install the project's dependencies. Navigate to the project's directory, and run the dependency manager:

```ShellSession
$ cd textpattern-bootstrap
$ npm install
```

**npm** installs Webpack and any necessary JavaScript packages.

## Building

This repository hosts sources and needs to be built before it can be used. After you have installed all dependencies, you will be able to run the build:

```ShellSession
$ npm run build
```

## Updating Bootstrap

If you'd like to upgrade to a newer version of Bootstrap down the road just run:

```ShellSession
$ npm update
```

## Pre-built version

We provide a pre-built version of the theme files within the `dist` directory in case you don't want to build it yourself.

## License

Licensed under MIT license except Textpattern templates, which are licensed under GPLv2 license.
