# Restaurant Review 

> Project #3 of the [Senior Software Nanodegree](https://www.udacity.com/course/senior-web-developer-nanodegree-by-google--nd802) by **Google** and [Udacity](https://www.udacity.com/).

## Goal

You will develop a restaurant review application with a focus on accessibility. You will remotely access JSON files containing restaurant information (including name, a photograph, address, cuisine type and operating hours) as well as JSON files containing review information for each restaurant (name of reviewer, date of review, 5-star rating and comments). The reviews application must include an application header, and a menu providing multiple ways to filter the restaurants (by cuisine, by location, etc). When viewing a specific restaurant, current reviews must be displayed along with a form for the user to submit their own review.

### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sass support                           | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more. (Run `gulp serve` or `gulp` for production)                                                                                                      |
| Performance optimization               | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean. (Run `gulp` to create an optimised version of your project to `/dist`)                                                                                                |
| Code Linting               | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Web Starter Kit uses ESLint with [eslint-config-google](https://github.com/google/eslint-config-google), which tries to follow the Google JavaScript style guide.                                                                                                |
| ES2015 via Babel 6.0                   | Optional ES2015 support using [Babel](https://babeljs.io/). To enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the [.babelrc](.babelrc) file. ES2015 source code will be automatically transpiled to ES5 for wide browser support.  |
| Built-in HTTP Server                   | A built-in server for previewing your site locally while you develop and iterate                                                                                                                                                                            |
| Live Browser Reloading                 | Reload the browser in real-time anytime an edit is made without the need for an extension. (Run `gulp serve` and edit your files)                                                                                                                           |
| Cross-device Synchronization           | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io). (Run `gulp serve` and open up the IP provided on other devices on your network)                       |

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

## Installation

1. **Clone** or **Download** the [git project](https://github.com/codesandtags/restaurant-review).

2. [Use npm](https://docs.npmjs.com/cli/install) to install all dependencies in the _package.json_.
```sh
npm install
```

3. Once you finish to install the dependencies you can start the project using the *gulp tasks*. 
(please review the [gulpfile.babel.js](https://github.com/codesandtags/restaurant-review/blob/master/gulpfile.babel.js)

## Usage

#### Run development tasks:
By default *gulp* command run the *development* task.

- Start the server in development mode
```
gulp serve
```

- Start the server in production mode
```
gulp serve:dist
```

## Licence
**
Apache 2.0
    
