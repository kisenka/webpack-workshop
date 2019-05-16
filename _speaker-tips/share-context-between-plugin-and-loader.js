compiler.hooks.compilation.tap('MyPlugin', compilation => {
  compilation.hooks.normalModuleLoader.tap('MyPlugin', loaderCtx => {
    loaderCtx._myData = myData;
  });
});
