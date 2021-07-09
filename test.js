import test from 'ava';
import execa from 'execa';

test('main', async (t) => {
  const { stdout } = await execa('./cli.js', ['ponies']);
  t.is(stdout.indexOf('version') >= 0, true);
});
