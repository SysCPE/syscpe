module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['<rootDir>/src/tests/integration/**/*.ts'],
  // testMatch: ['<rootDir>/src/tests/integration/**/end_workgroup.test.ts'], // Uncomment to run a single test
  testPathIgnorePatterns: ['<rootDir>/src/tests/integration/mocks/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
