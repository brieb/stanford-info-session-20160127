var webpack = require("webpack");
var path = require("path");

var SRC_DIR = path.join(__dirname, "src");
var BUILD_DIR = path.join(__dirname, "build");

module.exports = {
  debug: true,
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client",
    "./src/index.tsx",
    "./src/index.less"
  ],
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: "tslint",
        include: SRC_DIR
      },
      {
        test: /index\.less$/,
        loader: "import-glob-loader"
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts",
        include: SRC_DIR
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less",
        include: SRC_DIR
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
        loader: require.resolve("url-loader") + "?name=../[path][name].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.glsl$/,
        loader: "shader"
      },
      {
        test: /worker\.worker\.js$/,
        loader: "babel"
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js",
    chunkFilename: "[id].js",
    publicPath: "/public/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [SRC_DIR],
    extensions: ["", ".jsx", ".js", ".tsx", ".ts", ".less", ".css", ".json"],
    alias: {
      "mapbox-gl": path.resolve("./node_modules/mapbox-gl")
    }
  }
};
