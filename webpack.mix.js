const mix = require("laravel-mix");

mix
  .ts("popup/index.ts", "dist")
  .sass("popup/assets/main.scss", "css")
  .vue()
  .options({
    processCssUrls: false,
  })
  .setPublicPath("dist")
  .disableNotifications();

mix.copy("./lib", "./dist");

mix
  .ts("browser/index.ts", "./dist/browser.js")
  .sass("browser/assets/main.scss", "./dist/css/browser.css")
  .disableNotifications();

mix.options({ legacyNodePolyfills: true });
mix.webpackConfig({
  resolve: {
    fallback: {
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify")
    },
  },
});
