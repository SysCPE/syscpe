module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['<rootDir>/src/tests/integration/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/integration/setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/src/tests/integration/setup.ts',
    '<rootDir>/src/tests/integration/mocks/',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
