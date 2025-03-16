
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, 
  expect: {
    timeout: 5000   
  },
  reporter: 'html',
  use: {
    baseURL: 'https://nikola.verso.de',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  }
});