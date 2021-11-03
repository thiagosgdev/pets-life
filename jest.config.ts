export default {
    roots: ['<rootDir>/src'],
    collectCoverage: false,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!**/test/**',
      ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    preset: '@shelf/jest-mongodb',
    transform: {
      ".+\\.ts": "ts-jest"
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1"
    }
  };
  