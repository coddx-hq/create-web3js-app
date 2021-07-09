import test from 'ava';
import execa from 'execa';

test('main', async (t) => {
  const { stdout } = await execa('./cli.js', ['testdir']);
  t.is(stdout.indexOf('Version') >= 0, true);
});
