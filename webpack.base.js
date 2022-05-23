module.exports = {
    // Tell webpack to run babel on every
    // files it runs through.
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],


                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
}
