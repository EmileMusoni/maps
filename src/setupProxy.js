const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/arcgis', // adjust the path as needed
    createProxyMiddleware({
      target: 'https://cors-anywhere.herokuapp.com/https://portal.space.gov.rw',
      changeOrigin: true,
    })
  );
};
