module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["<rootDir>/tests/unit/@(*.)@(spec.js)"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!vue-multiselect)"],
};
