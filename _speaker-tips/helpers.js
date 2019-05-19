const HarmonyImportSideEffectDependency = require('webpack/lib/HarmonyImportSideEffectDependency');
const HarmonyImportSpecifierDependency = require('webpack/lib/dependencies/HarmonyImportSpecifierDependency');

class PluginHelpers {
  getModuleParents(cssModule, compilation) {
    const isChildCompiler = compilation.compiler.isChild();

    const allModules = []
      .concat(
        compilation.modules,
        isChildCompiler ? compilation.compiler.parentCompilation.modules : []
      )
      .filter((module) => this.imports.has(module.request));

    const parents = allModules.filter((module) => {
      const cssModuleDep = module.dependencies
        .filter((d) => d instanceof HarmonyImportSideEffectDependency)
        .find((d) => d.module.resource === cssModule.resource);

      return !!cssModuleDep;
    });

    return parents;
  }
}
