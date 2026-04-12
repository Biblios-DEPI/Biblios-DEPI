import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: process.env.PW_TEST_EMAIL || 'beshoy@biblios.com',
  password: process.env.PW_TEST_PASSWORD || 'beshoyfomail',
};

async function login(page) {
  await page.goto('/login');
  await page.getByPlaceholder('name@example.com').fill(TEST_USER.email);
  await page.getByPlaceholder('********').fill(TEST_USER.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/');
}

test.describe('Wishlist flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('biblios_wishlist_'))
        .forEach((key) => localStorage.removeItem(key));
    });
  });

  test('block wishlist action when logged out', async ({ page }) => {
    await page.goto('/');
    await page.locator('.wishlist-link').click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('toggle wishlist item when logged in', async ({ page }) => {
    await login(page);

    await page.goto('/books');
    await page.locator('.wishlist-icon-btn').first().click();

    await page.goto('/wishlist');
    await expect(page.getByRole('heading', { name: 'My Wishlist' })).toBeVisible();
    await expect(page.locator('.wishlist-card', { hasText: 'The Alchemist' })).toBeVisible();

    await page.locator('.wishlist-card', { hasText: 'The Alchemist' }).locator('.remove-btn').click();
    await expect(page.locator('.wishlist-card', { hasText: 'The Alchemist' })).toHaveCount(0);
  });
});
