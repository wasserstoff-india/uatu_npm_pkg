module.exports= {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index_bundle.js',
    path: "/home/wsft02/source_files/uatu_npm_pkg/dist",
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
    library: 'MyLibrary',
  }
};