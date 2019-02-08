# Laravel Mix Polyfill

A Laravel Mix extension for Babel Polyfill.

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
      targets: {"firefox": "50", "ie": 11}
   });
```

## Options

| Name        | Type                          | Default      | Description   |
| ----------- | ----------------------------- | ------------ | ------------- |
| enabled     | `boolean`                     | `true`       | Should polyfill be used |
| useBuiltIns | `string`                      | `"usage"`    | [See here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) and [here](https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack) for detailed description. |
| targets     | `string`, `object`, `boolean` | `"defaults"` | Allows a target (browser) environment to be specified. This can either be: <br> &bull; a [browserslist-compatible](https://github.com/ai/browserslist) query (`"> 0.25%, not dead"`), <br> &bull; an object of minimum environment versions to support (`{"chrome": "58", "ie": "11"}`),<br> &bull; or `false` to transform all ECMAScript 2015+ code by default. You can test string values on [browserl.ist](https://browserl.ist/). |