const MILLISECONDS = 1000;

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    testTimeout: 60 * MILLISECONDS,
    transformIgnorePatterns: [],
    "watchPathIgnorePatterns": [
        "<rootDir>/node_modules",
    ],
}