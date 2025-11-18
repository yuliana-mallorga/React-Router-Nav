# E2E Tests with Playwright

This directory contains end-to-end tests for the React Router application using Playwright.

## Test Structure

### Test Files

- **auth.spec.js** - Authentication flow tests
  - Login functionality
  - Logout functionality
  - Session persistence
  - Role assignment during login

- **protected-routes.spec.js** - Protected route access tests
  - Unauthenticated user redirection
  - Authenticated user access
  - Public route availability

- **posts.spec.js** - Blog post CRUD operations
  - Creating new posts
  - Editing existing posts
  - Deleting posts
  - Post persistence in localStorage
  - Slug generation from titles
  - Author attribution

- **roles.spec.js** - Role-based access control tests
  - Admin role assignment
  - Editor role assignment
  - Beta tester role assignment
  - Multiple role assignment
  - Role persistence

## Running Tests

### Run all tests (headless mode)
```bash
npm test
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View last test report
```bash
npm run test:report
```

### Run specific test file
```bash
npx playwright test e2e/auth.spec.js
```

### Run tests matching a pattern
```bash
npx playwright test --grep "login"
```

## Test Users

The tests use the following predefined users from `roleList.js`:

- **Freddy** - Admin user
- **Yuliana** - Editor user
- **Sacha** - Beta tester user
- **Nicolai** - Admin + Beta tester user
- **RegularUser** - No special roles

## Configuration

The Playwright configuration is in `playwright.config.js`:

- Tests run against `http://localhost:5173` (Vite dev server)
- Dev server starts automatically before tests
- Tests run in Chromium browser
- Screenshots and traces captured on failure
- HTML report generated after test run

## Best Practices

1. **Test Isolation**: Each test clears localStorage before running
2. **Authentication**: Tests that require authentication login in the `beforeEach` hook
3. **Waiting**: Tests use Playwright's auto-waiting for elements to be visible
4. **Selectors**: Tests use flexible selectors to be resilient to UI changes
5. **Assertions**: Multiple assertion strategies for robust verification

## Debugging Failed Tests

When a test fails:

1. Check the HTML report: `npm run test:report`
2. View screenshots in `test-results/` directory
3. Run in headed mode to see what's happening: `npm run test:headed`
4. Use debug mode to step through: `npm run test:debug`
5. Check the trace viewer for detailed execution timeline

## Known Issues

The tests may reveal bugs mentioned in CLAUDE.md:
- PostProvider line 49 & 76: Incorrect assignment of `draft.title.trim()` to `author`
- PostProvider line 30: Uses `getItem()` instead of `setItem()` preventing persistence

Consider fixing these bugs before expecting all tests to pass.
