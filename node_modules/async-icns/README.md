<div align="center">

# async-icns

Convert image files to MacOS icon file (`.icns`) files.

![License](https://img.shields.io/npm/l/async-icns?style=for-the-badge)
![Compat](https://img.shields.io/badge/Compatibility-MacOS-yellow?style=for-the-badge)
![Version](https://img.shields.io/npm/v/async-icns?style=for-the-badge)

</div>

## Installation

CLI global install:

```sh
npm install async-icns -g
```

To use programmatically (in NodeJS).

```bash
npm install async-icns --save
# Or for yarn
yarn add async-icns
```

## CLI Usage

```sh
$ async-icns file.png
```

Note that if your icon is smaller than `1024 × 1024`, you will have to remove one of the size options. Make sure that the largest size you request is less than half the size as your icon. For example, if one of your icons was `512 × 512`, the max icon size would be `256 × 256`:

```sh
$ async-icns file.png -s 16,32,64,128,256
```

You can aso specify the alternative output:

```sh
$ async-icns file.png -o output.icns
```

## As a library

```js
const { convert } = require('async-icns')

async function main() {
  await convert({ input: 'file.png', output: 'output.icns' })
}

main()
```

You can also specify the output size in the same way as specifed above:

```js
const { convert } = require('async-icns')

async function main() {
  await convert({
    input: 'file.png',
    output: 'output.icns',
    sizes: [16, 32, 64, 128, 256],
  })
}

main()
```
