const bootstrapSassAbstractsImports = require('vue-cli-plugin-bootstrap-vue/sassAbstractsImports.js');
const path = require('path');
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: bootstrapSassAbstractsImports.join('\n'),
            },
            scss: {
                additionalData: [...bootstrapSassAbstractsImports, ''].join(';\n'),
            },
        },
    },
    outputDir: path.resolve(__dirname, '../prueba-back/public'),
    devServer: {
        proxy: {
            '/api': { target: 'http://localhost:3000' },
        },
    },
};
