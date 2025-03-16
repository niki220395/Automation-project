
const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class TaskPage extends BasePage {
    constructor(page) {
        super(page);
  
        // Locators for task creation
        this.addTaskButton = page.locator('mat-icon:has-text("add")');
        this.newTaskPlaceholder = page.getByText('New task');
        this.taskTitleInput = page.getByLabel('Title *', { exact: true });
        this.taskDescriptionInput = page.getByRole('textbox', { name: 'Description' })
        this.taskAssigneesInput = page.getByRole('combobox', { name: 'Assignees *' });
        this.taskAssigneesOption = page.locator('span.mat-option-text:has-text("Verso Maintenance")');
        this.taskDeadlineInput = page.getByRole('button', { name: 'Open calendar' });
        this.taskStatusButton = page.getByRole('tabpanel', { name: 'tasks' }).getByLabel('Pick a Status');
        this.taskStatus = (status) => page.getByText(status)
        this.taskStatusOption = (statusOptionText) => page.getByRole('option', { name: statusOptionText });
        this.saveTaskButton = page.getByRole('button').filter({ hasText: /^save$/ });
        this.deleteTaskButton = page.getByRole('button').filter({ hasText: 'delete' });
        this.taskTabOnTaskList = (titleText) => page.getByRole('button', { name: `${titleText} user-avatar` });
        this.editButton = page.getByRole('button').filter({ hasText: 'edit' });
  
        // Locators for toast messages
        this.toastMessageForTaskCreation = page.getByText('Task Created Successfully');
        this.toastMessageForTaskUpdate = page.getByText('Task updated');
    }

    // Option to choose a date should be improved to allow any future date to be set as a deadline. With current implementaiton, only visible dates can be chosen. 
    /**
     * Fills in task details and selects an assignee.
     * @param {string} title - The title of the task.
     * @param {string} description - The description of the task.
     * @param {number} deadline - The deadline in days from today.
     */
    async fillTaskDetails(title, description, deadline){
      await this.taskTitleInput.fill(title);
      await this.taskDescriptionInput.first().fill(description);
      await this.taskAssigneesInput.first().fill("A");
      await expect(this.taskAssigneesOption).toBeVisible();
      await this.taskAssigneesOption.click();
      await this.taskDeadlineInput.first().click();
      await this.selectDayOnTheCalendar(this.page, deadline);
    }

    // Update task details and fill task details can be optimized with a single method. Currently, update task details doesn't include updating an asignee as it should. Further investigation is needed, which is out of the time scope for this assignment. 
    /**
     * Updates task details.
     * 
     * @param {string} title - The new title of the task.
     * @param {string} description - The new description of the task.
     * @param {number} deadline - The new deadline in days from today.
     * @param {string} status - The new status of the task.
     */
   async updateTaskDetails(title, description, deadline, status){
  
    await this.taskStatusButton.click();
    await this.taskStatusOption(status).click();
    // This should be improved to not include implicit waits but to rely on specific state of the application. Test executed too quickly for state change to apply. 
    await this.page.waitForTimeout(2000)

    await this.taskTitleInput.fill(title);
    await this.taskDescriptionInput.first().fill(description);
    await this.taskDeadlineInput.first().click();
    await this.selectDayOnTheCalendar(this.page, deadline);
   }

   async selectDayOnTheCalendar(page, deadLineInDays) {
    const calendarCell = await this.page.locator(`.mat-calendar-body-cell-content:has-text("${deadLineInDays}")`);
    await calendarCell.click();
  }
}
module.exports = TaskPage;
