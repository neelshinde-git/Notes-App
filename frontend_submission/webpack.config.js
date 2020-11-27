const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports ={
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                        loader: "html-loader"
                    }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
            },
        ]
    },
    plugins: [
                new HtmlWebPackPlugin({
                        template: "./src/index.html",
                        filename: "./index.html"
                    })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        overlay: true,
        open: true
    }
};
