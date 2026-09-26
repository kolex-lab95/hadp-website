import {test, expect} from '@playwright/test';

test('Administration : routes protégées sans configuration Supabase', async ({page}) => {
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login\?reason=setup/);
  await expect(page.getByRole('heading', {name: 'Configuration requise'})).toBeVisible();
});

test('Administration : écran de configuration utilisable sur mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/admin/login');
  await expect(page.locator('main')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
