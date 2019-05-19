module.exports = {
  apply(compiler) {
    // Parser
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, factory => {
      factory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, parser => {

      });
    });

    // Compilation
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      // Share plugin data with loader
      compilation.hooks.normalModuleLoader.tap(PLUGIN_NAME, loaderCtx => {
        // do something
      });


      // Modify runtime
      compilation.hooks.afterOptimizeDependencies.tap(PLUGIN_NAME, modules => {

      });
    });
  }
};
