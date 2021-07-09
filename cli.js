#!/usr/bin/env node
import meow from 'meow';
import { existsSync, mkdirSync } from 'fs';
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

async function init() {
  const [name] = cli.input;

  if (!name) {
    console.log('ERROR: missing project name.');
    process.exit(1);
  }
  if (existsSync(name)) {
    console.log('ERROR: directory already exists.');
    process.exit(1);
  }
  console.log(`Creating web3 app "${name}"`);
  // console.log(name || 'unicorns', cli.flags);

  mkdirSync(name);
}

init().catch((e) => {
  console.error(e);
});
