module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    "@babel/preset-typescript"
  ]  
};

// module.exports = {
//   "roots": [
//     "<rootDir>/src"
//   ],
//   "testMatch": [
//     "**/__tests__/**/*.+(ts|tsx|js)",
//     "**/?(*.)+(spec|test).+(ts|tsx|js)"
//   ],
//   "transform": {
//     "^.+\\.(ts|tsx)$": "ts-jest"
//   },
// }