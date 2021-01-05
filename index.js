const mix = require('laravel-mix');

class Polyfill {
    dependencies() {
        return ['core-js', 'regenerator-runtime'];
    }

    register(config) {
        this.config = Object.assign({
            enabled: true,
            useBuiltIns: "usage",
            targets: "defaults",
            entryPoints: "stable",
            corejs: 3,
            debug: false,
        }, config);
    }

    webpackConfig(webpackConfig) {
        if ((this.config.enabled === true)
            && (this.config.useBuiltIns === "entry")
            && (this.config.entryPoints !== false)) {
            Object.entries(webpackConfig.entry).forEach(v => {
                webpackConfig.entry[v[0]].unshift("laravel-mix-polyfill/entry/"
                    + this.config.entryPoints
                    + ".js");
            });
        }

        if ((this.config.enabled === true) && (typeof this.config.targets === "string")) {
            webpackConfig.target = 'browserslist:' + this.config.targets;
        }
    }

    babelConfig() {
        let polyfillPresets = {
            "useBuiltIns": this.config.useBuiltIns,
        };

        if (this.config.useBuiltIns !== false) {
            polyfillPresets.corejs = this.config.corejs;
        }

        if (this.config.targets) {
            polyfillPresets.targets = this.config.targets;
        }

        if (this.config.debug) {
            polyfillPresets.debug = this.config.debug;
        }

        let returnObject = {
            presets: [
                [
                    '@babel/preset-env',
                    polyfillPresets
                ]
            ],
        };

        if (this.config.debug) {
            returnObject.cacheDirectory = false;
        }

        return this.config.enabled ? returnObject : {};
    }
}

mix.extend('polyfill', new Polyfill());