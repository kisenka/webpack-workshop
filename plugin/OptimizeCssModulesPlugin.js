const ReplaceDependency = require('./ReplaceDependency');

const PLUGIN_NAME = 'OptimizeCssModulesPlugin';

class OptimizeCssModulesPlugin {
  constructor() {
    this.imports = new Map();
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, factory => {
      factory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, parser => {
        this.extractUsages(parser);
      });
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.normalModuleLoader.tap(PLUGIN_NAME, loaderCtx => {
        loaderCtx[PLUGIN_NAME] = this;
      });

      compilation.dependencyTemplates.set(
        ReplaceDependency,
        new ReplaceDependency.Template()
      );

      compilation.hooks.afterOptimizeDependencies.tap(PLUGIN_NAME, modules => {
        this.inlineClassNames(modules);
      });
    });
  }

  extractUsages(parser) {
    const imports = this.imports;

    parser.hooks.importSpecifier
      .tap(PLUGIN_NAME, (expr, path, exportName, name) => {
        if (!path.endsWith('.css')) {
          return;
        }

        imports.set(parser.state.module.request, {
          name,
          path,
          range: expr.range,
          loc: expr.loc
        });
      });

    parser.hooks.expressionAnyMember
      .for('imported var')
      .tap(PLUGIN_NAME, (expr) => {
        const data = imports.get(parser.state.module.request);

        if (!data) {
          return;
        }

        if (!data.usages) {
          data.usages = [];
        }

        data.usages.push({
          name: expr.property.name,
          objectRange: expr.object.range,
          range: expr.range,
        });
      });
  }

  getModuleParents(cssModule, compilation) {
    const isChildCompiler = compilation.compiler.isChild();

    const allModules = []
      .concat(
        compilation.modules,
        isChildCompiler ? compilation.compiler.parentCompilation.modules : []
      )
      .filter((module) => this.imports.has(module.request));

    return allModules.filter((module) => {
      const cssModuleDep = module.dependencies
        .filter(d => d.module)
        .find(d => d.module.resource === cssModule.resource);

      return !!cssModuleDep;
    });
  }

  saveFinalClassNames(cssModule, parents, messages) {
    parents.forEach(m => {
      const usages = this.imports.get(m.request).usages;

      usages.forEach(usage => {
        const msg = messages.find(m => m.item && m.item.key === usage.name);

        if (msg) {
          usage.value = msg.item.value;
        }
      })
    });
  }

  inlineClassNames(modules) {
    const imports = this.imports;

    modules
      .filter(module => imports.has(module.request))
      .forEach(module => {
        const data = imports.get(module.request);

        module.dependencies
          .filter(d => d.range)
          .forEach(d => {
            const usage = data.usages.find(u => u.objectRange.toString() === d.range.toString());

            if (!usage) {
              return;
            }

            const replaceDep = new ReplaceDependency(
              usage.range,
              JSON.stringify(usage.value)
            );

            module.removeDependency(d);
            module.addDependency(replaceDep);
          });
      });
  }

  getAllUsages() {
    return Array
      .from(this.imports.values())
      .map(item => item.usages)
      .reduce((acc, usage) => acc.concat(usage), [])
  }
}

module.exports = OptimizeCssModulesPlugin;
