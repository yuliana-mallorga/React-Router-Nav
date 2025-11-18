import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/selectors.js';

test.describe('Role-Based Access Control', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should assign admin role to admin users', async ({ page }) => {
    // Login as admin (Freddy from roleList.js)
    await loginUser(page, 'Freddy');

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify admin role is displayed
    const adminIndicator = page.locator('text=/admin/i, [data-role="admin"]');
    await expect(adminIndicator).toBeVisible();

    // Verify in context/localStorage
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    expect(userContext.isAdmin).toBe(true);
  });

  test('should assign editor role to editor users', async ({ page }) => {
    // Login as editor (Yuliana from roleList.js)
    await loginUser(page, 'Yuliana');

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify editor role is displayed
    const editorIndicator = page.locator('text=/editor/i, [data-role="editor"]');
    await expect(editorIndicator).toBeVisible();

    // Verify in context/localStorage
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    expect(userContext.isEditor).toBe(true);
  });

  test('should assign beta tester role to beta tester users', async ({ page }) => {
    // Login as beta tester (Sacha from roleList.js)
    await loginUser(page, 'Sacha');

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify beta tester role is displayed
    const betaTesterIndicator = page.locator('text=/beta.*tester/i, [data-role="beta-tester"]');
    await expect(betaTesterIndicator).toBeVisible();

    // Verify in context/localStorage
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    expect(userContext.isBetaTester).toBe(true);
  });

  test('should not assign any role to regular users', async ({ page }) => {
    // Login as regular user (not in any roleList)
    await loginUser(page, 'RegularUser');

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify no special role is displayed
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    expect(userContext.isAdmin).toBeFalsy();
    expect(userContext.isEditor).toBeFalsy();
    expect(userContext.isBetaTester).toBeFalsy();
  });

  test('should display multiple roles for users with multiple permissions', async ({ page }) => {
    // Login as user with multiple roles (Nicolai from roleList.js - admin and beta tester)
    await loginUser(page, 'Nicolai');

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify multiple roles in context
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    // Nicolai should have both admin and beta tester roles
    expect(userContext.isAdmin).toBe(true);
    expect(userContext.isBetaTester).toBe(true);
  });

  test('should persist roles after page reload', async ({ page }) => {
    // Login as admin
    await loginUser(page, 'Freddy');

    // Reload page
    await page.reload();

    // Navigate to profile
    await page.goto('/#/profile');

    // Verify admin role is still there
    const adminIndicator = page.locator('text=/admin/i, [data-role="admin"]');
    await expect(adminIndicator).toBeVisible();

    // Verify in context/localStorage
    const userContext = await page.evaluate(() => {
      const auth = localStorage.getItem('user');
      return auth ? JSON.parse(auth) : null;
    });

    expect(userContext.isAdmin).toBe(true);
  });
});
