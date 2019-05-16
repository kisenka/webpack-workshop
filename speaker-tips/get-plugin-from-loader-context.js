module.exports = function getPluginFromLoaderContext(loaderContext, namespace) {
  const { _compiler: compiler } = loaderContext;

  const parentCompiler = compiler.isChild()
    ? compiler.parentCompilation.compiler
    : null;

  return parentCompiler
    ? parentCompiler.options.plugins.find(
      (p) => p.namespace && p.namespace === namespace
    )
    : loaderContext[namespace];
}
