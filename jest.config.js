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
    "!<rootDir>/src/utils/history.js",
    "!<rootDir>/src/utils/constants.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/config/setupTest.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  }
};