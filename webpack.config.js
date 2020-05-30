const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.

    entry: path.join(__dirname, "./src/js/index.js"), // string | object | array  // 这里应用程序开始执行
    // webpack 开始打包

    output: {
        // webpack 如何输出结果的相关选项

        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    },
                    // {
                    //     loader: "postcss-loader"
                    // },
                    // {
                    //     loader: "autoprefixer-loader"
                    // }
                ]
            },

            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                        ]
                    }
                },
                exclude: /node_modules/
            },

            // {
            //     test: /.(ttf|woff2|woff|eot|svg)$/,
            //     loader: "file-loader",
            //     options: {
            //         name: "[name].[ext]?[hash]"
            //     }
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     // include: [resolve('static'), resolve('src')],
            //     options: {
            //         limit: 100000,
            //         // name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },
        ]
    },

    plugins: [
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: path.join(__dirname, "./src/select.html")

        }),
    ],
    devtool: "eval",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        // compress: true,
        compress: false,
        port: 1717
    }
}