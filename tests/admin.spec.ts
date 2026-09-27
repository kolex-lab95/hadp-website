import {test, expect} from '@playwright/test';

test('Administration : routes protégées redirigées sans session', async ({page}) => {
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole('heading', {name: 'Connexion'})).toBeVisible();
});

test('Administration : le mot de passe peut être affiché puis masqué', async ({page}) => {
  await page.goto('/admin/login');
  const password = page.locator('input[name="password"]');
  await expect(password).toHaveAttribute('type', 'password');
  await page.getByRole('button', {name: 'Afficher le mot de passe'}).click();
  await expect(password).toHaveAttribute('type', 'text');
  await page.getByRole('button', {name: 'Masquer le mot de passe'}).click();
  await expect(password).toHaveAttribute('type', 'password');
});

test('Administration : connexion épurée sans logo ni slogan retiré', async ({page}) => {
  await page.goto('/admin/login');
  await expect(page.getByRole('heading', {name: 'Connexion'})).toBeVisible();
  await expect(page.getByText('Accédez aux contenus institutionnels de HADP.')).toHaveCount(0);
  await expect(page.locator('main img[alt="HADP"]')).toHaveCount(0);
});

for (const width of [360, 390, 430, 768, 820, 900, 1024, 1100, 1280, 1366, 1440, 1600, 1920]) {
  test(`Administration : écran de connexion sans débordement à ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/admin/login');
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
