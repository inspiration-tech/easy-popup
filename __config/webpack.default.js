module.exports = env => {
    return  {
        module: {
            rules: [
                {
                    test: /\.(less)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "../src/css/[name]"+ (env.NODE_ENV === 'dev' ? '' : '.min') +".css",
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'less-loader' ,
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                "@babel/plugin-transform-runtime"
                            ],
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                }
            ]
        },
        devtool: env.NODE_ENV === 'dev' ? 'source-map' : false
    };
};