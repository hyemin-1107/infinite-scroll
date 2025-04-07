export default {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['/node_modules/(?!(react-router-dom)/)'],
    moduleNameMapper: {
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
      },
};