module.exports = class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('HelloWorldPlugin', (stats) => {
      console.log(stats.hasErrors());
    });
  }
};
