const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');


class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators for Login page elements
        this.usernameInput = page.getByRole('textbox', { name: 'username' });
        this.passwordInput = page.getByRole('textbox', { name: 'password' });
        this.signInButton =  page.getByRole('button', { name: 'Sign in' });
    }

    /**
     * Sign in to the application
     * @param {string} username - Optional username (default: from env variables)
     * @param {string} password - Optional password (default: from env variables)
     */
   async signInOnTheLoginPage(username = process.env.USERNAME, password = process.env.PASSWORD){
    try {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    } 
   }
}
module.exports = LoginPage;
