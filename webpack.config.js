const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:{
                            url: false,
                            sourcemap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            sourcemap: true,
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')({zindex:false})
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/top.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'bio/index.html',
            template: './src/pug/bio.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'works/index.html',
            template: './src/pug/works.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'works/pianoid-ii/index.html',
            template: './src/pug/pianoid-ii.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'works/cosmophony/index.html',
            template: './src/pug/cosmophony.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'works/quantization/index.html',
            template: './src/pug/quantization.pug'
        })
    ]
};