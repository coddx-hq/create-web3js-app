import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// import polyfillNode from 'rollup-plugin-polyfill-node'; // e.g. add 'Buffer' to browser env.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util'
    }
  }
});
