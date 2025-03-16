const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);

        this.dashboardButton = page.getByRole('link').filter({ hasText: 'dashboard' });

        // Locators for task-related elements on the Dashboard
        this.taskTitle = (titleText) => page.getByText(titleText);
        this.taskAssignedToIcon = page.getByRole('cell', { name: 'user-avatar' });
        this.taskType = page.getByRole('cell', { name: 'Topics' }).locator('span');
        this.taskDeadline = (day) => page.getByText(`calendar_today ${day}-03-`);
        this.taskStatus = (status) => page.getByRole('cell', { name: `Pick a Status ${status}`});
        this.taskDeleteButton = page.getByRole('cell').filter({ hasText: 'delete' });
        this.createdByMeTab = page.getByRole('link', { name: 'Tasks created by me' });
        this.noResultImage = page.getByRole('img', { name: 'no-results' });

        //Locator for the delete the task pop-up screen
        this.confirmDeleteTaskButton = page.getByRole('button', { name: 'Confirm' });
    }

    /**
     * Deletes a task from the dashboard page.
     */
    async deleteTheTaskFromDashboardPage(){
       await this.taskDeleteButton.click();
       await this.confirmDeleteTaskButton.click();
    }

}
module.exports = DashboardPage;