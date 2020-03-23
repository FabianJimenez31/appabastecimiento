const { removeModuleScopePlugin, override, babelInclude } = import("customize-cra");
const path = import("path");

// eslint-disable-next-line no-undef
module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([
    path.resolve("src")
  ]
  )
);
