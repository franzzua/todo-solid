const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: `${__dirname}/src/index.ts`,
    },
    output: {
        path:  `${__dirname}/dist`,
        filename: "index.js"
    },
    devServer: {
        contentBase: './dist',
        port: 3003
    },
    target: 'web',
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.html', '.json'],
        alias: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
        },
        mainFields: ["browser","main"]
    },
    module: {
        rules: [
            {
                test: /\.css/,
                loader: 'css-loader'
            },
            {
                test: /\.html$/,
                loader: 'string-loader',
            },
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ]
}
