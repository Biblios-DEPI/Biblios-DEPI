import { test, expect } from '@playwright/test';

test.describe('Cart flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('biblios_cart_'))
        .forEach((key) => localStorage.removeItem(key));
    });
  });

  async function addBookToCart(page) {
    await page.goto('/books/4');
    await expect(page.getByRole('heading', { name: 'Nineteen Eighty-Four' })).toBeVisible();
    await page.locator('.book-detail').getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.locator('.cart-container span')).toHaveText('1');
  }

  test('add book to cart and verify item appears', async ({ page }) => {
    await addBookToCart(page);

    await page.goto('/cart');
    await expect(page.getByText('Nineteen Eighty-Four')).toBeVisible();
    await expect(page.getByText('George Orwell')).toBeVisible();
    await expect(page.locator('.cart-book .number')).toHaveText('1');
  });

  test('update quantity and verify totals', async ({ page }) => {
    await addBookToCart(page);

    await page.goto('/cart');
    await page.locator('.quantity .more').last().click();

    await expect(page.locator('.cart-book .number')).toHaveText('2');
    await expect(page.locator('.summary .row-item').filter({ hasText: 'Subtotal' })).toContainText('$32.08');
    await expect(page.locator('.summary .row-item').filter({ hasText: /^Total/ })).toContainText('$34.65');
  });

  test('remove item and verify cart state', async ({ page }) => {
    await addBookToCart(page);

    await page.goto('/cart');
    await page.locator('.remove-container').click();

    await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse Books' })).toBeVisible();
  });
});
