const path = require('path');
const sfe = require('@sipin/sfe');
const srcPath = path.join(__dirname, './src');
const isDev = process.env.NODE_ENV !== 'production';
// 环境变量
const envConfig = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  API_HOST: JSON.stringify(process.env.API_HOST || ''),
  CDN_URL: JSON.stringify('/static'),
};

const webpackConfig = sfe(() => ({
  entry: './src/index.tsx',
  template: {
    'index.html': {
      filename: 'index.html',
      template: './src/index.ejs',
      favicon: './src/favicon.ico',
    },
  },
  chunk: true,
  extractCSS: true,
  devServer: {
    port: 3101,
    proxy: {
      '/api': {
        target: 'http://admin.sipin.latest.dev.e.sipin.one',
        secure: false,
      },
    },
  },
  presets: [
    require('@sipin/sfe-preset-standard')(),
    require('@sipin/sfe-preset-react')(),
    require('@sipin/sfe-preset-typescript')(),
    require('@sipin/sfe-preset-eslint')(),
  ],
  env: {
    'process.env': envConfig,
  },
  static: [
    {
      from: path.join(
        __dirname,
        './src/configs/config.' + (isDev ? 'dev' : 'prod') + '.js'
      ),
      to: path.join(__dirname, './dist/static/config.js'),
    },
  ],
}));

module.exports = webpackConfig;
