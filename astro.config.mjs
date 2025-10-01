import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: 'src',
  site: 'https://dmrcv.me',
  output: 'static',
  build: {
    format: 'directory'
  }
});
