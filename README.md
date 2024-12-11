# is-esm-cli 🕵️‍♂️

This tools tells you if a package uses ECMAScript modules (ESM) or not. 📦

## Why Should You Care? 🤔

ECMAScript modules are statically analyzable, which means bundlers and JavaScript optimizers can remove unused exports. This helps you create smaller bundles and boosts performance! ⚡

By knowing if a package uses ESM, you can better optimize your project and reduce its overall size. It also makes it easier to identify packages that are not treeshakable (i.e. they are not statically analyzable). 🌳

👉 Learn more about the impact of ESM on bundle size: [Web.dev - CommonJS larger bundles](https://web.dev/commonjs-larger-bundles/).

## How to Use It 🚀

To achieve optimal performance, use `bunx` to execute `is-esm` (though `npx` is also an option). For instance, to verify if a package utilizes ESM, do the following:

```sh
# Check if Day.js uses ESM
$ bunx is-esm dayjs@2.0.0-alpha.4
$ ✔ Yes
```

```sh
# Check if Moment uses ESM
$ bunx is-esm moment
$ ✖ No
```

## License ⚖️

This project is licensed under the MIT License.
