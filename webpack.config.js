const min = process.argv.indexOf('-p') >= 0;

let config = {
    entry: './src/aloepups.js',
    output: {
        filename: './dist/aloepups.js',
        library: 'AloePups',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}

if(min) {
    config.output.filename = './dist/aloepups.min.js'
    config.devtool = 'source-map'
}

module.exports = config