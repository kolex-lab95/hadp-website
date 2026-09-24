import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [360, 390, 430, 768, 1024, 1366, 1440, 1920];
for (const locale of ['fr', 'en']) {
  for (const width of widths) {
    test(`${locale} / ${width}px : rendu, liens et débordements`, async ({page}) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {if (message.type() === 'error') errors.push(message.text());});
      await page.setViewportSize({width, height: 960});
      await page.goto(locale === 'fr' ? '/' : '/en');
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(() => page.locator('main img').first().evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
      const externalHrefs = await page.locator('a[href^="https://"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')),
      );
      expect(externalHrefs).toEqual(['https://wa.me/22796508146']);
      const layout = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        width: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll('main *, header *, footer *')]
          .filter((node) => {
            if (node.closest('[aria-hidden="true"]') || node.closest('[inert]')) return false;
            const box = node.getBoundingClientRect();
            return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1);
          }).map((node) => node.tagName + '.' + node.className),
        controls: [...document.querySelectorAll('header a, main a, main button, footer a, footer button')]
          .filter((node) => {
            const style = getComputedStyle(node);
            if (
              style.display === 'none' ||
              style.visibility === 'hidden' ||
              node.closest('[aria-hidden="true"]') ||
              node.closest('[inert]')
            ) {
              return false;
            }

            const box = node.getBoundingClientRect();
            if (box.width === 0 || box.height === 0) return false;
            return box.height < 44 || box.width < 44;
          }).map((node) => node.textContent),
        bodyFont: getComputedStyle(document.body).fontFamily,
        headingFont: getComputedStyle(document.querySelector('h1')!).fontFamily,
        imagesHaveDimensions: [...document.images].every((image) => image.width > 0 && image.height > 0),
        fontsLoaded: [...document.fonts].filter((font) => font.status === 'loaded').length,
      }));
      expect(layout.width).toBeLessThanOrEqual(layout.viewport);
      expect(layout.overflow).toEqual([]);
      expect(layout.controls).toEqual([]);
      expect(layout.bodyFont.toLowerCase()).toContain('inter');
      expect(layout.headingFont.toLowerCase()).toContain('manrope');
      expect(layout.fontsLoaded).toBeGreaterThanOrEqual(2);
      expect(layout.imagesHaveDimensions).toBe(true);
      expect(errors).toEqual([]);
    });
  }
  test(`${locale} : audit automatisé WCAG 2.1 AA`, async ({page}) => {
    await page.goto(locale === 'fr' ? '/' : '/en');
    const audit = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
  });
}

test('FR par défaut ; choix EN mémorisé ; retour FR', async ({browser}) => {
  const context = await browser.newContext({locale: 'en-US'});
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await page.getByRole('banner').getByRole('button', {name: /Choisir la langue/}).click();
  await page.getByRole('banner').getByRole('menuitem', {name: 'English', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/\/en$/);
  expect((await context.cookies()).find((cookie) => cookie.name === 'hadp_locale')?.value).toBe('en');
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL(/\/en$/);
  await page.getByRole('banner').getByRole('button', {name: /Choose a language/}).click();
  await page.getByRole('banner').getByRole('menuitem', {name: 'Français', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page).toHaveURL('http://localhost:3000/');
  await context.close();
});

test('Navigation mobile accessible', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Fermer le menu principal');
  await expect(page.getByRole('navigation', {name: 'Ouvrir le menu principal'})).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#mobile-navigation')).toBeHidden();
});

test('Clavier, ancre utile, réduction des mouvements et zoom texte', async ({page}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', {name: 'Aller au contenu principal'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', {name: 'Découvrir HADP'}).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.emulateMedia({reducedMotion: 'reduce'});
  expect(await page.locator('.button').first().evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
  await page.setViewportSize({width: 390, height: 844});
  await page.addStyleTag({content: 'html {font-size: 200%;}'});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('Menu mobile : focus et blocage du défilement', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  const dialog = page.getByRole('dialog', {name: 'Ouvrir le menu principal'});
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', {name: /Choisir la langue/})).toBeFocused();
  expect(await page.locator('body').evaluate((body) => getComputedStyle(body).overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
  expect(await page.locator('body').evaluate((body) => getComputedStyle(body).overflow)).not.toBe('hidden');
});

test('Dropdown langue : clavier, Escape et clic extérieur', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 900});
  await page.goto('/');
  const trigger = page.getByRole('banner').getByRole('button', {name: /Choisir la langue/});
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('banner').getByRole('menuitem', {name: 'Français'})).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('banner').getByRole('menuitem', {name: 'English'})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await page.locator('main').click({position: {x: 10, y: 10}});
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('Dropdown langue dans le menu mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  await page.locator('button[aria-controls="mobile-navigation"]').click();
  const dialog = page.getByRole('dialog', {name: 'Ouvrir le menu principal'});
  await dialog.getByRole('button', {name: /Choisir la langue/}).click();
  await dialog.getByRole('menuitem', {name: 'English'}).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/\/en$/);
});

for (const width of [360, 390, 430]) {
  test(`Menu burger complet à ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 844});
    await page.goto('/');
    const toggle = page.locator('button[aria-controls="mobile-navigation"]');
    await toggle.click();
    const dialog = page.getByRole('dialog', {name: 'Ouvrir le menu principal'});
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', {name: 'À propos'})).toBeVisible();
    await expect(dialog.getByRole('link', {name: 'Nous contacter'})).toBeVisible();
    await dialog.getByRole('link', {name: 'À propos'}).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/about$/);
    await toggle.click();
    await dialog.click({position: {x: 4, y: 100}});
    await expect(dialog).toBeHidden();
  });
}

test('Footer : coordonnées sobres et réseaux sans redirection', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('a[href="mailto:contact@hadpniger.com"]')).toHaveCount(2);
  const whatsapp = page.locator('main a[href="https://wa.me/22796508146"]');
  await expect(whatsapp).toHaveCount(1);
  for (const link of await whatsapp.all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
  const footer = page.locator('footer');
  await expect(footer.getByText('E-mail', {exact: true})).toBeVisible();
  await expect(footer.getByText('Téléphone', {exact: true})).toBeVisible();
  await expect(footer.getByText('Localisation', {exact: true})).toBeVisible();
  await expect(footer.locator('.social-icon')).toHaveCount(5);
  await expect(footer.locator('.social-icon--unavailable')).toHaveCount(5);
  await expect(footer.locator('.social-list a')).toHaveCount(0);
  const urlBeforeSocialClick = page.url();
  await footer.locator('.social-icon--unavailable').first().click();
  await expect(page).toHaveURL(urlBeforeSocialClick);
});

for (const width of [360, 390, 768, 1440]) {
  test(`CTA collaborer : boutons alignés à ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 960});
    await page.goto('/');
    const cta = page.locator('.final-cta');
    const email = cta.getByRole('link', {name: 'Nous écrire'});
    const whatsapp = cta.getByRole('link', {name: /WhatsApp/});

    await expect(email).toHaveAttribute('href', 'mailto:contact@hadpniger.com');
    await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/22796508146');
    await expect(whatsapp).toHaveAttribute('target', '_blank');
    await expect(cta.getByText('contact@hadpniger.com', {exact: true})).toHaveCount(0);
    await expect(cta.getByText('+227 96 50 81 46', {exact: true})).toHaveCount(0);

    const geometry = await page.locator('.final-cta-actions').evaluate((actionsElement) => {
      const measure = (element: Element) => {
        const {width, top, right, left} = element.getBoundingClientRect();
        return {width, top, right, left};
      };
      const methods = measure(actionsElement.querySelector('.contact-methods')!);
      const emailButton = measure(actionsElement.querySelector('.contact-method--email')!);
      const whatsappButton = measure(actionsElement.querySelector('.contact-method--whatsapp')!);
      const actionsButton = measure(actionsElement.querySelector('.contact-actions-link')!);
      return {methods, emailButton, whatsappButton, actionsButton};
    });
    expect(Math.abs(geometry.methods.width - geometry.actionsButton.width)).toBeLessThanOrEqual(1);
    if (width < 640) {
      expect(Math.abs(geometry.emailButton.width - geometry.actionsButton.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(geometry.whatsappButton.width - geometry.actionsButton.width)).toBeLessThanOrEqual(1);
    } else {
      expect(Math.abs(geometry.emailButton.top - geometry.whatsappButton.top)).toBeLessThanOrEqual(1);
      expect(geometry.emailButton.right).toBeLessThanOrEqual(geometry.whatsappButton.left);
    }
  });
}

const internalRoutes = ['about', 'interventions', 'actions', 'gallery', 'partners', 'contact'] as const;
for (const locale of ['fr', 'en'] as const) {
  for (const route of internalRoutes) {
    test(`${locale} /${route} : navigation, métadonnées et accessibilité essentielle`, async ({page}) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {if (message.type() === 'error') errors.push(message.text());});
      await page.setViewportSize({width: 1440, height: 960});
      await page.goto(locale === 'fr' ? `/${route}` : `/en/${route}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('title')).not.toHaveText(/HADP — Humanité, Inclusion, Action/);
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
      await expect(page.getByRole('banner').getByRole('link', {name: locale === 'fr' ? 'À propos' : 'About'})).toHaveAttribute(
        'href', locale === 'fr' ? '/about' : '/en/about',
      );
      expect(errors).toEqual([]);
    });
  }
}

for (const locale of ['fr', 'en'] as const) {
  for (const route of internalRoutes) {
    for (const width of [360, 390, 430, 768, 1024, 1366, 1440, 1920]) {
      test(`${locale} /${route} : responsive à ${width}px`, async ({page}) => {
      await page.setViewportSize({width, height: 960});
      await page.goto(locale === 'fr' ? `/${route}` : `/en/${route}`);
      const layout = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        width: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll('main *, header *, footer *')].filter((node) => {
          if (node.closest('[aria-hidden="true"]') || node.closest('[inert]')) return false;
          const box = node.getBoundingClientRect();
          return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1);
        }).map((node) => node.tagName + '.' + node.className),
      }));
      expect(layout.width).toBeLessThanOrEqual(layout.viewport);
      expect(layout.overflow).toEqual([]);
      });
    }
  }
}

for (const route of internalRoutes) {
  test(`/${route} : audit automatisé WCAG 2.1 AA`, async ({page}) => {
    await page.goto(`/${route}`);
    const audit = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
  });
}

test('Contact : validation accessible et liens directs', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/contact');
  await page.getByRole('button', {name: 'Envoyer'}).click();
  await expect(page.locator('#contact-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Ce champ est requis.').first()).toBeVisible();
  await expect(page.getByRole('link', {name: 'Nous écrire'})).toHaveAttribute('href', 'mailto:contact@hadpniger.com');
  await expect(page.getByRole('link', {name: /WhatsApp/})).toHaveAttribute('href', 'https://wa.me/22796508146');
});

test('Captures finales de contrôle à 390px et 1440px', async ({page}) => {
  test.setTimeout(60000);
  for (const width of [390, 1440]) {
    await page.setViewportSize({width, height: width === 390 ? 844 : 1000});
    await page.goto('/');
    const images = page.locator('main img');
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    const sections = page.locator('.reveal');
    for (let index = 0; index < await sections.count(); index += 1) {
      await sections.nth(index).scrollIntoViewIfNeeded();
      await expect(sections.nth(index)).toHaveAttribute('data-revealed', 'true');
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({path: `qa/phase-2-home-${width}-final.png`, fullPage: true});
  }
});

test('Captures Phase 3', async ({page}) => {
  test.setTimeout(60000);
  const captures = [
    {route: '/about', width: 1440, height: 1000, path: 'qa/phase-3-about-1440.png'},
    {route: '/actions', width: 1440, height: 1000, path: 'qa/phase-3-actions-1440.png'},
    {route: '/contact', width: 390, height: 844, path: 'qa/phase-3-contact-390.png'},
  ];
  for (const capture of captures) {
    await page.setViewportSize({width: capture.width, height: capture.height});
    await page.goto(capture.route);
    const images = page.locator('main img');
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    const sections = page.locator('.reveal');
    for (let index = 0; index < await sections.count(); index += 1) {
      await sections.nth(index).scrollIntoViewIfNeeded();
      await expect(sections.nth(index)).toHaveAttribute('data-revealed', 'true');
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({path: capture.path, fullPage: true});
  }
});

