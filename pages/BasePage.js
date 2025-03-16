class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to a specified path or URL
     * @param {string} path - Relative URL
     */
    async navigateTo(path = '/') {
        await this.page.goto(path);
    }

     /**
     * Wait for an element to appear on the page
     * @param {string} selector - CSS selector of the element
     * @param {number} timeout - Optional timeout in milliseconds (default: 3000ms)
     */
    async waitForElement(selector,  timeout = 3000) {
        await this.page.waitForSelector(selector);
    }
}
module.exports = BasePage;