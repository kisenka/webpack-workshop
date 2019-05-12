module.exports = class MyPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
      factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
        // parser.hooks.call.tap('console.log', 'MyPlugin', expr => {
        //   debugger;
        // })
      });
    });
  }
};
