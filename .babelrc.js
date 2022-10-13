const babel = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14.0.0'
        }
      }
    ],
    '@babel/preset-typescript'
  ]
};

module.exports = babel;
