import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: process.env.PW_TEST_EMAIL || 'beshoy@biblios.com',
  password: process.env.PW_TEST_PASSWORD || 'beshoyfomail',
};

async function login(page) {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  await page.getByPlaceholder('name@example.com').fill(TEST_USER.email);
  await page.getByPlaceholder('********').fill(TEST_USER.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/');
}

test.describe('Auth flows', () => {
  test('login with valid credentials', async ({ page }) => {
    await login(page);
    await expect(page.locator('img[alt="Profile"]')).toBeVisible();
  });

  test('logout from authenticated session', async ({ page }) => {
    await login(page);

    await page.locator('img[alt="Profile"]').click();
    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });
});
