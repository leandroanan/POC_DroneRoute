module.exports = {
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
};
