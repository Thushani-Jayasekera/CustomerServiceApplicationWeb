module.exports = {
  testEnvironment: 'jest-environment-jsdom',
// ... other options ...
  moduleNameMapper: {
    '^.+.(svg)$': 'jest-transform-stub',
  }

}