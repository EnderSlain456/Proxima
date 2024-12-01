// @ts-check

/**
 * Don't change `d.ts` files. Change the documentation in icns.js
 * @typedef {{}} Notes
 */

/**
 * MIT License
 *
 * Copyright (c) 2016 Moin Uddin and 2022 TrickyPR
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @typedef {{}} Copyright
 */

const { mkdir, rmdir } = require('fs/promises')
const { join } = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const aexec = promisify(exec)

/**
 * The config that is used for the primary conversion
 * @typedef Config
 * @property {string} input The input file
 * @property {?string} output The output file name
 * @property {?string} tmpDirectory The temporary directory to use
 * @property {?(number[])} sizes The list of sizes to use
 */

/**
 * Resizes an image using SIPs
 * @param {string} source The source image to be processed
 * @param {string} out The output file name
 * @param {number} size The size of the new image
 */
async function resizeImage(source, out, size) {
  await aexec(`sips '${source}' -Z ${size} --out '${out}'`)
}

/**
 * @template T
 * @template U
 * @param {T[]} iter The list to iterate through
 * @returns {Promise<U[]>}
 */
async function forAll(iter, cb) {
  return Promise.all(iter.map(cb))
}

/**
 * Convert an image file to a .icns file
 * @param {Config} config The configuration object
 */
async function convert(config) {
  if (!config) {
    throw new Error('Please provide a configuration object.')
  }

  if (!config.input) {
    throw new Error('Please provide an input file.')
  }

  if (process.platform !== 'darwin') {
    throw new Error('This script is only supported on MacOS.')
  }

  const input = config.input
  const output = config.output || 'icon.icns'
  const tmpDirectory =
    config.tmpDirectory || join(__dirname, 'tmp_' + Date.now())
  const sizes = config.sizes || [16, 32, 64, 128, 256, 512]

  await mkdir(tmpDirectory)

  await forAll(sizes, async (/** @type {number} */ size) => {
    const output = join(tmpDirectory, `icon_${size}x${size}.png`)
    const output2x = join(tmpDirectory, `icon_${size}x${size}@2x.png`)

    await resizeImage(input, output, size)
    await resizeImage(input, output2x, size * 2)
  })

  await aexec(`iconutil --convert icns --output '${output}' '${tmpDirectory}'`)
  await rmdir(tmpDirectory, { recursive: true })
}

module.exports = { convert }
