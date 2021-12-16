module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**'],
  coveragePathIgnorePatterns: ['<rootDir>/src/tests/'],
  testPathIgnorePatterns: ['<rootDir>/src/tests/integration/mocks/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
