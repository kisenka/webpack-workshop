```js
parser.hooks.importSpecifier
  .tap(namespace, (expr, request, exportName, identifier) => {
    // parser.state
  });

parser.hooks.expressionAnyMember
  .for('imported var')
  .tap(namespace, (expr) => {
    // parser.state
  });
```
