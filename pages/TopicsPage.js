const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class TopicsPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators for Topics module and navigaing to Topic detail view
        this.sideNavigationButton = page.locator('.admin-right-sidenav-open');
        this.topicsModuleButton = page.getByRole('link', { name: 'Topics' });
        this.topic = (topicText) => page.getByText(topicText);
        this.taskTab = page.locator('.mat-tab-label-content:has-text("Tasks")');
    }

    /**
     * Navigate to specific topic's task tab.
     * 
     * @param {string} topicTitle The title of the topic to open.
     */
    async navigateToTopicTasks(topicTitle){
        await this.topicsModuleButton.click();
        await this.topic(topicTitle).first().click();
        await this.sideNavigationButton.click();
        await this.taskTab.click();
        }
}
module.exports = TopicsPage;