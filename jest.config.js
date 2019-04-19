module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      }
    }
  },
  "clearMocks": true,
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageReporters": [
    "text",
    "lcov"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  "testEnvironment": "node",
  "testMatch": [
    "**/__tests__/**/*.(ts)?(x)",
    "**/?(*.)+(spec|test).(ts)?(x)"
  ],
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  setupFilesAfterEnv: ['./jest.setup.js']
}