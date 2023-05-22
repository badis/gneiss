import nextJest from "next/jest.js";
import { pathsToModuleNameMapper } from "ts-jest";
import type { Config } from "@jest/types";
import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config: Config.InitialOptions = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  modulePaths: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["cypress"],
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
