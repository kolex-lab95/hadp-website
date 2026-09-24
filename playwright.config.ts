import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 2,
  reporter: [['list'], ['json', {outputFile: 'test-results/report.json'}]],
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Edge'],
    channel: 'msedge',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node node_modules/next/dist/bin/next start --hostname localhost',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});


