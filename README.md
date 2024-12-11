# `is-esm`

<p align="center">
  <img src="https://raw.githubusercontent.com/mgechev/is-esm/master/demo.gif" alt="">
</p>

This package tells you if an npm module uses ECMAScript modules or not.

## Why do I need to know?

ECMAScript modules are statically analyzable. This helps bundlers and JavaScript optimizers to get rid of the unused exports and ultimately make your bundles smaller.

You can read more about this [here](https://web.dev/commonjs-larger-bundles/).

## How to use it?

To use `is-esm`:

```sh
$ npx is-esm dayjs 8.0.0
$ ✔ Yes
```

```sh
$ npx is-esm moment
$ ✖ No
```

## License

MIT
