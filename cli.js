#!/usr/bin/env node
import meow from 'meow';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const cli = meow(
  `
	Usage
	  $ create-web3js-app [input]

	Options
	  --postfix  Lorem ipsum  [Default: rainbows]

	Examples
	  $ cli-name
	  unicorns & rainbows
	  $ cli-name ponies
	  ponies & rainbows
`,
  {
    flags: {
      postfix: {
        type: 'string',
        default: 'rainbows'
      }
    }
  }
);

console.log(`version: ${packageJson.version}`);
// console.log(moduleName(cli.input[0] || "unicorns", cli.flags));
