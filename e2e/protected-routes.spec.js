import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/selectors.js';

test.describe('Protected Routes', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect unauthenticated user from profile to login', async ({ page }) => {
    await page.goto('/#/profile');

    // Should redirect to login
    await page.waitForURL(/\/#\/login/);
    expect(page.url()).toContain('login');
  });

  test('should redirect unauthenticated user from logout to login', async ({ page }) => {
    await page.goto('/#/logout');

    // Should redirect to login
    await page.waitForURL(/\/#\/login/);
    expect(page.url()).toContain('login');
  });

  test('should allow authenticated user to access profile', async ({ page }) => {
    // Login first
    await loginUser(page, 'TestUser');

    // Navigate to profile
    await page.goto('/#/profile');

    // Should stay on profile page
    expect(page.url()).toContain('profile');

    // Verify profile content is visible
    const profileContent = page.locator('text=/profile|username|TestUser/i').first();
    await expect(profileContent).toBeVisible();
  });

  test('should allow authenticated user to access logout', async ({ page }) => {
    // Login first
    await loginUser(page, 'TestUser');

    // Navigate to logout
    await page.goto('/#/logout');

    // Should process logout and redirect to login
    await page.waitForURL(/\/#\/login/);
    expect(page.url()).toContain('login');
  });

  test('should allow unauthenticated users to access public routes', async ({ page }) => {
    // Test home page
    await page.goto('/#/');
    expect(page.url()).toMatch(/\/#\/?$/);

    // Test blog page
    await page.goto('/#/blog');
    expect(page.url()).toContain('blog');

    // Test login page
    await page.goto('/#/login');
    expect(page.url()).toContain('login');
  });
});
