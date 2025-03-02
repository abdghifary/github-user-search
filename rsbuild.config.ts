import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],

  output: {
    assetPrefix:
      process.env.NODE_ENV === 'production'
        ? '/github-user-search/' // Replace with your repository name
        : '/',
  },
});
