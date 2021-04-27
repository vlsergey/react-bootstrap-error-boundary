# @vlsergey/react-bootstrap-error-boundary

Ready-to-use error boundary with Bootstrap Alert as error text display.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

# Goal
Do not duplicate same code of for [Alert](https://react-bootstrap.github.io/components/alerts/) usage in different projects.

# Installation
```
npm i --save @vlsergey/react-bootstrap-error-boundary
```
or
```
npm i --save-dev @vlsergey/react-bootstrap-error-boundary
```

# Usage
```jsx
import ErrorBoundary from '@vlsergey/react-bootstrap-error-boundary';

/*...*/

<ErrorBoundary>
    {/*...*/}
</ErrorBoundary>
```

# Props
| Property           | Type    | Default value | Description |
| ------------------ | ------- | :-------------:| ----------- |
| logToConsole       | boolean | `true`        | Log error and react error info to browser console |
| errorMessage       | ( error : unknown ) : ReactNode | <code>(prefix)(error)</code> | Text (react node) to display on error as Alert children. Defined as function of error. |
| errorMessagePrefix | string  | `"Error occured: "` | Prefix to display before error message. Ignored if `errorMessage` function is provided. |
| variant            | See [bootstrap Alert](https://react-bootstrap.github.io/components/alerts/) variants | `'danger'` | Alert variant to display |

# Changelog
Unspecified minor versions are for dependencies updates.

## 2.0.0
* ✨ Allow to change prefix as string without redefining whole render message function.

## 1.0.0
* 🎉 Initial version

[npm-image]: https://img.shields.io/npm/v/@vlsergey/react-bootstrap-error-boundary.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-error-boundary
[travis-image]: https://travis-ci.com/vlsergey/react-bootstrap-error-boundary.svg?branch=master
[travis-url]: https://travis-ci.com/vlsergey/react-bootstrap-error-boundary
[downloads-image]: http://img.shields.io/npm/dm/@vlsergey/react-bootstrap-error-boundary.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-error-boundary
