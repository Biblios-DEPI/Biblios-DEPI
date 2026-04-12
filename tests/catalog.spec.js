import { test, expect } from '@playwright/test';

test.describe('Catalog flows', () => {
  test('search books and verify filtered results', async ({ page }) => {
    await page.goto('/books');

    const searchInput = page.locator('#search-book');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('George');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/books\?query=George/);
    await expect(page.getByText('Nineteen Eighty-Four')).toBeVisible();
  });

  test('open a book details page from list or search', async ({ page }) => {
    await page.goto('/books');

    await page.getByRole('link', { name: 'Book Details' }).first().click();

    await expect(page).toHaveURL(/\/books\/\d+/);
    await expect(page.locator('.book-detail')).toBeVisible();
    await expect(page.locator('.book-detail').getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });
});
