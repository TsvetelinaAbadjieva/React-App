const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://hiring.rewardgateway.net',
      changeOrigin: true,
    })
  );
};