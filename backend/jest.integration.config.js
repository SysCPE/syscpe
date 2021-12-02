module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['<rootDir>/src/tests/integration/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/tests/integration/mocks/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
