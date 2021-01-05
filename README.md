<p align="center">
<a href="https://www.npmjs.com/package/laravel-mix-polyfill"><img src="https://img.shields.io/npm/v/laravel-mix-polyfill.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/laravel-mix-polyfill?minimal=true"><img src="https://img.shields.io/npm/dt/laravel-mix-polyfill.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/laravel-mix-polyfill"><img src="https://img.shields.io/npm/l/laravel-mix-polyfill.svg" alt="NPM"></a>
</p>

# Laravel Mix Polyfill

A Laravel Mix extension to include polyfills by using [Babel](https://babeljs.io/), [core-js](https://github.com/zloirock/core-js), and [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime).

## Usage

First, install the extension.

```
npm install laravel-mix-polyfill --save-dev
```

or

```
yarn add laravel-mix-polyfill --dev
```

Then, require it within your `webpack.mix.js` file:

```js
let mix = require('laravel-mix');

require('laravel-mix-polyfill');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .polyfill({
      enabled: true,
      useBuiltIns: "usage",
      targets: "firefox 50, IE 11"
   });
```

## Options

| Name        | Type                          | Default      | Description   |
| ----------- | ----------------------------- | ------------ | ------------- |
| enabled     | `boolean`                     | `true`       | Should polyfill be used. |
| useBuiltIns | `string`                      | `"usage"`    | [See here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) for detailed description. Possible values are: <br> &bull; `"usage"` <br> &bull; `"entry"` <br> &bull; `false`  |
| targets     | `string`, `boolean`           | `"defaults"` | Allows a target (browser) environment to be specified. This can either be: <br> &bull; a [browserslist-compatible](https://github.com/ai/browserslist) query (`"> 0.25%, not dead"`),<br> &bull; or `false` to transform all ECMAScript 2015+ code by default. <br><br> &bull; Setting to `false` will also allow use of browserslist config sources (like .browserslistrc). See [here](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration) and [here](https://github.com/browserslist/browserslist#queries) for more information. <br><br> You can test string values on [browserl.ist](https://browserl.ist/). |
| entryPoints | `string`, `boolean`           | `"stable"`   | Used when `useBuiltIns` is set to `"entry"`. See below for possible values. |
| corejs      | `number`                      | `3`          | The version of core-js to be used. |
| debug       | `boolean`                     | `false`      | Outputs the targets/plugins used to the console. |

### Entry Points

In `core-js@3` the entry points were changed to [allow for more flexibility](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#packages-entry-points-and-modules-names).

The following common presets have been included for ease, and will be inserted into the entry point for you automatically. `"stable"` has been set as the default [as it is a full equal](https://github.com/zloirock/core-js/blob/master/README.md#babelpolyfill) of the now deprecated `@babel/polyfill` package which was used previously.   

| Value          | Description   |
| -------------- | ------------- |
| **`"stable"`** | Polyfill only stable `core-js` features - ES and web standards. |
| `"all"`        | Polyfill all `core-js` features. |
| `"es"`         | Polyfill only stable ES features. |
| `"classic"`    | Imports copied from the latest `@babel/polyfill` package (before it was deprecated). |
| `false`        | Do not use a preset (you will need to add your own imports to the top of your entry point). |