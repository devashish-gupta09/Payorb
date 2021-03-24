module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        })

        return config
    },
    target: "serverless"
}