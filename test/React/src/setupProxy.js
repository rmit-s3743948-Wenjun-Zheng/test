const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        // /a/about /a/index  /b/about /b/index
        createProxyMiddleware('/api', {
            "target": "http://localhost:5000/",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/', // remove base path
            }
        })
    );
};