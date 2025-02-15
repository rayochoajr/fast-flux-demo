module.exports = {
  unstable_allowDynamic: [
    // Allow dynamic imports from node_modules
    '/node_modules/@aws-sdk/**',
    '/node_modules/@sentry/**',
    '/node_modules/lodash/**',
  ],
}; 