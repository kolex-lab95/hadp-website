import {expect, test} from '@playwright/test';

for (const width of [360, 390, 430, 768, 1024, 1366, 1440, 1920]) {
  test(`gallery lightbox and layout remain complete at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 1000});
    await page.goto('/fr/gallery');
    const archiveItems = page.locator('.gallery-page-grid--archive .gallery-page-item');
    await expect(archiveItems).toHaveCount(3);
    const boxes = await archiveItems.evaluateAll((items) => items.map((item) => { const box = item.getBoundingClientRect(); return {top: box.top, bottom: box.bottom, left: box.left, right: box.right, width: box.width}; }));
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(boxes.every((box) => box.width > 0 && box.left >= 0 && box.right <= viewportWidth)).toBeTruthy();
    await archiveItems.nth(1).click();
    const dialog = page.getByRole('dialog');
    const image = dialog.getByRole('img', {name: /participantes|participants/i});
    await expect(image).toBeVisible();
    const [imageBox, viewport] = await Promise.all([image.boundingBox(), page.evaluate(() => ({width: window.innerWidth, height: window.innerHeight}))]);
    expect(imageBox).not.toBeNull();
    expect(imageBox!.width).toBeLessThanOrEqual(viewport.width);
    expect(imageBox!.height).toBeLessThanOrEqual(viewport.height);
    await page.keyboard.press('Escape');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
}

test('only editorial first images retain visible gallery overlays', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 1000});
  await page.goto('/fr/gallery');
  await expect(page.locator('.gallery-page-grid--archive .gallery-page-caption')).toHaveCount(1);
  await expect(page.locator('.gallery-page-grid--coordination .gallery-page-caption')).toHaveCount(1);
  await page.screenshot({path: 'qa/retouches-lightbox-gallery-1440.png', fullPage: true});
});

test('capacity section integrates the third workshop image without crowding mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/fr');
  await expect(page.locator('.home-capacity-building .field-actions-image--detail')).toBeHidden();
  await page.setViewportSize({width: 768, height: 1000});
  await expect(page.locator('.home-capacity-building .field-actions-image--detail')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.screenshot({path: 'qa/retouches-accueil-images-768.png', fullPage: true});
});

test('domain copy and internal heading treatment are synchronized in French and English', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/fr');
  await expect(page.locator('#interventions .intervention-row').first().getByText('Promouvoir l’alphabétisation numérique comme levier d’inclusion, d’autonomie et d’accès aux opportunités.')).toBeVisible();
  await page.goto('/en');
  await expect(page.locator('#interventions .intervention-row').first().getByText('Promote digital literacy as a lever for inclusion, autonomy and access to opportunities.')).toBeVisible();
  await page.goto('/en/actions');
  await expect(page.locator('.internal-hero-title')).toHaveCSS('text-wrap', 'pretty');
});
