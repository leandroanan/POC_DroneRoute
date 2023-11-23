module.exports = {
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    presets: ["@babel/preset-react"],
    plugins: ["@babel/plugin-syntax-jsx"],
    setupFiles: ['<rootDir>/jest.setup.js']
};
