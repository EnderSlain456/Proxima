#!/usr/bin/env node

'use strict'

const { program } = require('commander')
const { convert } = require('./icns')

program
  .version(require('./package.json').version)
  .arguments('<file>')
  .usage('<path to image file> [Options]')
  .description('Convert an image file to an .icns file.')
  .option(
    '-o, --out <path>',
    '.icns output file name to store as. Default: icon.icns',
    function (v) {
      return v
    },
    'icon.icns'
  )
  .option(
    '-s, --sizes <list>',
    'comma separated list of sizes you want in the icns file.',
    function (v) {
      return v.split(',')
    },
    [16, 32, 64, 128, 256, 512]
  )
  .action(function (file, opts) {
    convert(
      {
        in: file,
        out: opts.out,
        sizes: opts.sizes,
      },
      function () {
        console.log('Successfully converted.')
      }
    )
  })
  .on('--help', function () {
    console.log('  Examples:')
    console.log('')
    console.log('    $ png2icns file.png')
    console.log('    $ png2icns file.png -o file.icns')
    console.log('    $ png2icns file.png -o file.icns -s 16,32,64,128,256,512')
    console.log('')
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
