import {expect, test, type Page} from '@playwright/test';

const community = 'img_8.webp';
const workshop = 'img_9.webp';
const gathering = 'img_10.webp';

const imageSources = async (selector: string, page: Page) =>
  page.locator(selector).evaluateAll((images) => images.map((image) => decodeURIComponent(image.getAttribute('src') ?? '')));

const expectImageSource = async (selector: string, page: Page, asset: string) => {
  await expect(page.locator(selector)).toHaveCount(1);
  expect((await imageSources(selector, page))[0]).toContain(asset);
};

const expectNoHorizontalOverflow = (page: Page) =>
  expect(page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).resolves.toBeTruthy();

for (const width of [390, 768, 1440]) {
  test(`cleaned historic photos retain their exact placements at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 1000});

    await page.goto('/fr');
    await expectImageSource('.hero-media img', page, community);
    await expectImageSource('.home-field-actions .field-actions-image--main img', page, community);
    await expectImageSource('.home-field-actions .field-actions-image--accent img', page, workshop);
    const homeGallery = page.locator('#gallery');
    await homeGallery.scrollIntoViewIfNeeded();
    const homeSources = await imageSources('#gallery img', page);
    expect(homeSources.slice(0, 3)).toEqual([expect.stringContaining(community), expect.stringContaining(workshop), expect.stringContaining(gathering)]);
    await expectNoHorizontalOverflow(page);

    await page.goto('/fr/about');
    await expectImageSource('section[aria-labelledby="who-heading"] img', page, workshop);
    await expectNoHorizontalOverflow(page);

    await page.goto('/fr/interventions');
    await expectImageSource('.internal-hero-media img', page, community);
    await expectImageSource('.intervention-detail:nth-child(2) img', page, community);
    await expectImageSource('.intervention-detail:nth-child(3) img', page, workshop);
    await expectImageSource('.intervention-detail:nth-child(5) img', page, community);
    await expectImageSource('.intervention-detail:nth-child(6) img', page, workshop);
    await expectNoHorizontalOverflow(page);

    await page.goto('/fr/actions');
    await expectImageSource('.internal-hero-media img', page, workshop);
    const actionAlbumSources = await imageSources('.action-media-album img', page);
    expect(actionAlbumSources.slice(0, 3)).toEqual([expect.stringContaining(community), expect.stringContaining(workshop), expect.stringContaining(gathering)]);
    await expectNoHorizontalOverflow(page);

    await page.goto('/fr/gallery');
    const archive = page.locator('.gallery-page-grid--archive');
    await archive.scrollIntoViewIfNeeded();
    const gallerySources = await imageSources('.gallery-page-grid--archive img', page);
    expect(gallerySources).toHaveLength(3);
    expect(gallerySources).toEqual([expect.stringContaining(community), expect.stringContaining(workshop), expect.stringContaining(gathering)]);
    expect(await archive.locator('img').evaluateAll((images) => images.every((image) => {
      const photo = image as HTMLImageElement;
      return photo.complete && photo.naturalWidth > 0;
    }))).toBeTruthy();
    await expectNoHorizontalOverflow(page);

    await page.goto('/fr/partners');
    await expectImageSource('.internal-hero-media img', page, community);
    await expectNoHorizontalOverflow(page);
  });
}
