import { test, expect } from '@playwright/test';

test('homepage has correct title and play button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Stuk Verdriet');
  const playButton = page.locator('button', { hasText: 'Luisteren' }).first();
  await expect(playButton).toBeVisible();
});

test('bijsluiter form submission', async ({ page }) => {
  await page.goto('/bijsluiter');
  await page.fill('textarea', 'Dit is een test voor de bijsluiter.');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Bijwerking ontvangen')).toBeVisible();
});
