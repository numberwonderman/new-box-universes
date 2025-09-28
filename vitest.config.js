// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Enable treatment of .js files as modules for ES Module imports
    typecheck: {
        enabled: true,
    },
    // Allows running tests quickly from the command line
    globals: true,
    // Ensures tests are run in a node-like environment, critical for BigInt
    environment: 'node', 
    // Match the tests directory
        include: ['./tests/**/*.test.js'],
  },
});
