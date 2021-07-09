#!/usr/bin/env node
import meow from 'meow';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const cli = meow(
  `
	Usage
	  $ create-web3js-app <name>

	Options
	  --postfix  Lorem ipsum  [Default: rainbows]

	Examples
	  $ create-web3js-app my-app
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

console.log(`Version: ${packageJson.version}`);
if (!cli.input[0]) {
  console.log('ERROR: missing project name.');
  process.exit(1);
}
console.log(`Creating web3 app "${cli.input[0]}"`);
// console.log(cli.input[0] || 'unicorns', cli.flags);
