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

test.describe('Profile view flows', () => {
  test('open profile page as logged-in user and verify key fields', async ({ page }) => {
    await login(page);

    await page.goto('/profile');
    await expect(page).toHaveURL('/profile');

    await expect(page.locator('.display-name')).toContainText('Beshoy Foamil');
    await expect(page.getByText('beshoy@biblios.com')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Favorite Books' })).toBeVisible();
  });
});
