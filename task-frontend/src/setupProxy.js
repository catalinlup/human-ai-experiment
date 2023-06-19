const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/auth/*",
    createProxyMiddleware({
      target: "https://auth-service.run.app",
      changeOrigin: true,
    })
  );

  app.use(
    "/task/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );

  app.use(
    "/chat/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );

  app.use(
    "/session/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );

  app.use(
    "/room/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );


  app.use(
    "/user/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );

  app.use(
    "/vote/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  );


  app.use(
    "/socket.io/*",
    createProxyMiddleware({
      target: "http://localhost:9098",
      changeOrigin: true
    })
  )
};
