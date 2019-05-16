```js
parser.hooks.importSpecifier
  .tap(namespace, (expr, request, exportName, identifier) => {
    // parser.state
  });

parser.hooks.expressionAnyMember
  .tap('imported var', namespace, (expr) => {
    // parser.state
  });
```
