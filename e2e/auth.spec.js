import { test, expect } from '@playwright/test';
import { selectors, loginUser } from './helpers/selectors.js';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display login page for unauthenticated users', async ({ page }) => {
    await page.goto('/');

    // Should redirect to login or show login link
    const loginLink = page.locator(selectors.navigation.loginLink);
    await expect(loginLink).toBeVisible();
  });

  test('should successfully login with username', async ({ page }) => {
    await page.goto('/#/login');

    // Fill in username
    const usernameInput = page.locator(selectors.login.usernameInput);
    await usernameInput.fill('TestUser');

    // Submit form
    const submitButton = page.locator(selectors.login.submitButton);
    await submitButton.click();

    // Should redirect to home or profile
    await page.waitForURL(/\/#\/(profile|$)/);

    // Verify user is logged in (should see logout link or username)
    const logoutLink = page.locator(selectors.navigation.logoutLink);
    await expect(logoutLink).toBeVisible();
  });

  test('should successfully logout', async ({ page }) => {
    // First login
    await loginUser(page, 'TestUser');

    // Then logout
    await page.goto('/#/logout');

    // Should redirect to login
    await page.waitForURL(/\/#\/login/);

    // Verify user is logged out
    const loginLink = page.locator(selectors.navigation.loginLink);
    await expect(loginLink).toBeVisible();
  });

  test('should persist login state after page reload', async ({ page }) => {
    // Login
    await loginUser(page, 'TestUser');

    // Reload page
    await page.reload();

    // Should still be logged in
    const logoutLink = page.locator(selectors.navigation.logoutLink);
    await expect(logoutLink).toBeVisible();
  });

  test('should show admin role for admin users', async ({ page }) => {
    // Login as admin (from roleList.js)
    await loginUser(page, 'Freddy');

    // Go to profile to check role
    await page.goto('/#/profile');

    // Should show admin role (adjust selector based on your profile page)
    const adminText = page.locator('text=/admin/i');
    await expect(adminText).toBeVisible();
  });

  test('should show editor role for editor users', async ({ page }) => {
    // Login as editor (from roleList.js)
    await loginUser(page, 'Yuliana');

    // Go to profile to check role
    await page.goto('/#/profile');

    // Should show editor role
    const editorText = page.locator('text=/editor/i');
    await expect(editorText).toBeVisible();
  });
});
