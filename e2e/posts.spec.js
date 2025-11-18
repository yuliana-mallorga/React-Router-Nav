import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/selectors.js';

test.describe('Blog Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display blog posts on blog page', async ({ page }) => {
    await page.goto('/#/blog');

    // Should see blog page heading
    const heading = page.locator('h1:has-text("BlogPage")');
    await expect(heading).toBeVisible();

    // Should see blog posts (links within list items)
    const blogLinks = page.locator('ul li a[href*="/blog/"]');
    const count = await blogLinks.count();

    // Should have at least some posts (from blogData.js)
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/#/blog');

    // Click on first post link
    const firstPostLink = page.locator('ul li a[href*="/blog/"]').first();
    const postTitle = await firstPostLink.textContent();
    await firstPostLink.click();

    // Should navigate to post detail page
    await page.waitForURL(/\/#\/blog\/.+/);
    expect(page.url()).toMatch(/\/#\/blog\/.+/);

    // Should show the post title
    const titleOnPage = page.locator(`h1:has-text("${postTitle.trim()}")`);
    await expect(titleOnPage).toBeVisible();
  });

  test('should allow unauthenticated users to read blog posts', async ({ page }) => {
    await page.goto('/#/blog');

    // Click on a post
    const firstPostLink = page.locator('ul li a[href*="/blog/"]').first();
    await firstPostLink.click();

    // Should be able to view the post without logging in
    await page.waitForURL(/\/#\/blog\/.+/);

    // Page should load successfully
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('authenticated users can access blog', async ({ page }) => {
    // Login first
    await loginUser(page, 'TestUser');

    // Navigate to blog
    await page.goto('/#/blog');

    // Should see blog posts
    const heading = page.locator('h1:has-text("BlogPage")');
    await expect(heading).toBeVisible();
  });
});
