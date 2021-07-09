#!/usr/bin/env node
import meow from 'meow';
import { existsSync, mkdirSync, readdirSync, writeFileSync, statSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renameFiles = {
  _gitignore: '.gitignore',
  'web/_gitignore': 'web/.gitignore'
};

function copy(src, dest) {
  const stat = statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

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

  const template = 'vite-web3-react-ts';
  const templateDir = path.join(__dirname, `template-${template}`);

  const write = (root, file, content) => {
    const targetPath = renameFiles[file] ? path.join(root, renameFiles[file]) : path.join(root, file);
    if (content) {
      writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = readdirSync(templateDir);
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(name, file);
  }

  const pkg = require(path.join(templateDir, `web/package.json`));
  pkg.name = name;
  write(name, 'web/package.json', JSON.stringify(pkg, null, 2));

  console.log(`\nDone. Now run:\n$ cd ${name}/web\n$ yarn`);
}

init().catch((e) => {
  console.error(e);
});
