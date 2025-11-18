/**
 * Centralized selectors for the React Router application
 * Update these if the UI changes
 */

export const selectors = {
  login: {
    usernameInput: '#username',
    submitButton: 'button[type="submit"]:has-text("Entrar")',
  },
  navigation: {
    loginLink: 'a[href*="login"]',
    logoutLink: 'a[href*="logout"]',
  },
  blog: {
    createButton: 'button:has-text("New Post"), a:has-text("New Post"), button:has-text("Create"), a:has-text("Create"), button:has-text("Crear")',
    postLink: 'a[href*="/blog/"]',
  },
  postForm: {
    // These selectors target inputs within labels containing specific text
    titleInput: 'label:has-text("Title") input',
    contentInput: 'label:has-text("Content") textarea',
    authorInput: 'label:has-text("Author") input',
    submitButton: 'button[type="submit"]',
    editButton: 'button:has-text("Edit"), a:has-text("Edit"), button:has-text("Editar")',
    deleteButton: 'button:has-text("Delete"), button:has-text("Eliminar")',
  },
};

/**
 * Helper function to login a user
 */
export async function loginUser(page, username) {
  await page.goto('/#/login');
  const usernameInput = page.locator(selectors.login.usernameInput);
  await usernameInput.fill(username);
  const submitButton = page.locator(selectors.login.submitButton);
  await submitButton.click();
  await page.waitForURL(/\/#\/(profile|$)/);
}
