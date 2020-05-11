// jest.config.js
module.exports = {
  bail: false,
  clearMocks: true,
  rootDir: './',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.jsx",
    "!<rootDir>/jest.config.js",
    "!<rootDir>/node_modules/",
  ],
  setupFilesAfterEnv: ["<rootDir>/config/setupTest.js"],
  "transform": {
    "^.+\\.jsx?$": "babel-jest",
  }
};