const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/openapi',
        createProxyMiddleware({
            target: 'https://public.api.nexon.com',
            changeOrigin: true,
        })
    );
};