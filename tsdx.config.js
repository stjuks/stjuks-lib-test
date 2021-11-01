const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');
const path = require('path');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({}),
      alias({
        entries: [
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
          { find: '@mui/styled-engine', replacement: '@mui/styled-engine-sc' },
        ],
      })
    );

    return config;
  },
};
