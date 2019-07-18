const { override, addDecoratorsLegacy, disableEsLint, useBabelRc } = require('customize-cra')

module.exports = override(addDecoratorsLegacy(), disableEsLint(), useBabelRc())
