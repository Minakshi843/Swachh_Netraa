module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-flow',
    ],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          components: './components',
          contexts: './contexts',
          '@contexts': './contexts',
          assets: './assets',
        },
      }],
    ],
  };
};
