module.exports = {
    entry: './assets/js/main.js',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: __dirname + '/public/js',
        publicPath: '/',
        filename: 'main.min.js'
    }
};