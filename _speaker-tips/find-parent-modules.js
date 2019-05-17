const HarmonyImportSpecifierDependency = require('webpack/lib/dependencies/HarmonyImportSpecifierDependency');

module.exports = (cssModule, modules) => {
  modules.forEach((parentModule) => {
    parentModule.dependencies
      .filter((d) => d instanceof HarmonyImportSpecifierDependency)
      .filter((d) => d.module.resource === cssModule.resource)
  });
};
