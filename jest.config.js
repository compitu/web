module.exports = {
    globalSetup: 'jest-preset-angular/global-setup',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules',
        '<rootDir>/dist',
        '<rootDir>/e2e',
    ],
};
