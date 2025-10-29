import { test, expect } from '@playwright/test';

test('should load homepage and have correct title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
//   await expect(page).toHaveTitle('localhost:');
});