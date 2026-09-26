import {expect, test} from '@playwright/test';

for (const width of [360, 390, 430, 768, 1024, 1366, 1440, 1920]) {
  test(`home gallery remains balanced at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 1000});
    await page.goto('/fr');
    const gallery = page.locator('#gallery');
    await gallery.scrollIntoViewIfNeeded();
    const items = gallery.locator('.gallery-item');
    await expect(items).toHaveCount(6);
    const images = gallery.locator('img');
    await expect(images).toHaveCount(6);
    expect(await images.evaluateAll((nodes) => nodes.every((image) => Boolean(image.getAttribute('src'))))).toBeTruthy();
    const [boxes, viewportWidth] = await Promise.all([items.evaluateAll((nodes) => nodes.map((node) => { const box = node.getBoundingClientRect(); return {left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height}; })), page.evaluate(() => window.innerWidth)]);
    expect(boxes.every((box) => box.width > 0 && box.height > 0 && box.left >= 0 && box.right <= viewportWidth)).toBeTruthy();
    for (let index = 0; index < boxes.length; index += 1) for (let other = index + 1; other < boxes.length; other += 1) {
      const first = boxes[index]!; const second = boxes[other]!;
      const overlaps = first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
      expect(overlaps).toBeFalsy();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
}

test('home gallery retains legacy photos and adds three workshop images', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 1000});
  await page.goto('/fr');
  const sources = await page.locator('#gallery img').evaluateAll((images) => images.map((image) => decodeURIComponent(image.getAttribute('src') ?? '')));
  expect(sources.filter((source) => source.includes('/images/field/')).length).toBe(3);
  expect(sources.filter((source) => source.includes('/images/activities/humanitarian-coordination-workshop/')).length).toBe(3);
  await page.screenshot({path: 'qa/home-gallery-expanded-1440.png', fullPage: true});
});

test('expanded home gallery remains available in English on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/en');
  await expect(page.locator('#gallery .gallery-item')).toHaveCount(6);
  await page.screenshot({path: 'qa/home-gallery-expanded-390.png', fullPage: true});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});
