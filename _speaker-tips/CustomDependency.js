const Dependency = require('webpack/lib/Dependency');

class CustomDependency extends Dependency {
  constructor(module, usage) {
    super();
    this.module = module;
    this.usage = usage;
  }
}

CustomDependency.Template = class CustomDependencyTemplate {
  apply(dep, source) {
    const usage = dep.usage;
    source.replace(
      usage.range[0],
      usage.range[1] - 1,
      JSON.stringify(usage.value)
    )
  }
};

module.exports = CustomDependency;
