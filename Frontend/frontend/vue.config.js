module.exports = {
    'transpileDependencies': [
        'vuetify'
    ],
    'chainWebpack': config => {
        config.optimization.minimize(false);
        config.mode = 'development';
    }
};