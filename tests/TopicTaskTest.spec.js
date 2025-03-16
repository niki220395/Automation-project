const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage'); 
const DashboardPage = require('../pages/DashboardPage');
const TaskPage = require('../pages/TaskPage');
const TopicsPage = require('../pages/TopicsPage');
const TestHelpers = require('../helpers/TestHelpers');

let loginPage;
let dashboardPage;
let taskPage;
let topicsPage;
let helpers;

test.beforeEach(async({page})=>{
    loginPage =  new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    topicsPage = new TopicsPage(page);
    taskPage = new TaskPage(page);
    helpers = new TestHelpers(page);
   await loginPage.navigateTo('/admin/#/login');
   await loginPage.signInOnTheLoginPage();
})

test ('Check task creation in Topics Tasks', async({page})=>{

    // Further improvements: constants should be reused for tests and should be randomized. Applies to all tests. 
    const taskTitle = 'QA test';
    const taskDescription = 'Test description';
    const deadline = '29';
    const testTopic = 'Test Topic';
    const taskType = 'Topics';
    const taskStatus = 'Open';
    
    // Navigate to Topic's tasks and create a new task
    await topicsPage.navigateToTopicTasks(testTopic);
    await taskPage.addTaskButton.click();
    await taskPage.newTaskPlaceholder.click();
    await taskPage.fillTaskDetails(taskTitle, taskDescription, deadline);
    await taskPage.saveTaskButton.click();

    // Verify task creation toast message
    await expect(taskPage.toastMessageForTaskCreation).toBeVisible();
    await expect(taskPage.toastMessageForTaskCreation).toHaveText('Task Created Successfully');

    // Additional verification for Task details in the Task list should be implemented. Due to time limit, verification is limited to values presented in dashboard. 

    // Navigate to Dashboard
    await dashboardPage.dashboardButton.click();

    // Verify task details on dashboard
    await verifyTaskInDashboard(taskTitle, deadline, taskType, taskStatus)

    // Delete the created task
    await dashboardPage.deleteTheTaskFromDashboardPage();

    // If possible, this can be improved with different test structure. This is a quick solution as Delete API request is interupted with test execution and task is not deleted. 
    await page.waitForTimeout(2000)    
})

test ('Check task update in Topics Tasks', async({page})=>{

    const taskTitle = 'QA test';
    const taskDescription = 'Test description';
    const deadLineInDays = '29';
    const taskTitleUpdate = 'QA test update';
    const taskStatusUpdate = "In Progress"
    const taskDescriptionUpdate = 'Test description update';
    const deadLineInDaysUpdate = '30';
    const taskType = 'Topics';
    const testTopic = 'Test Topic';

    // Precondition: create a task to update 
    /*
    - if create task API is available can be used as a before test action. 
    - tests can be orginized as ordered tests, where createTask test will ensure task for update exists. 
    */
    await helpers.createTaskForTopic(testTopic, taskTitle, taskDescription, deadLineInDays);

    // Update task details
    await taskPage.taskTabOnTaskList(taskTitle).click();
    await taskPage.editButton.click();
    await taskPage.updateTaskDetails(taskTitleUpdate, taskDescriptionUpdate, deadLineInDaysUpdate, taskStatusUpdate);
    await taskPage.saveTaskButton.click();

    // Verify task update toast message
    await expect(taskPage.toastMessageForTaskUpdate).toBeVisible();
    await expect(taskPage.toastMessageForTaskUpdate).toHaveText('Task updated');

    // Additional verification for Task details in the Task list should be implemented. Due to time limit, verification is limited to values presented in dashboard. 

    // Navigate to Dashboard
    await dashboardPage.dashboardButton.click();

     // Verify task details on dashboard
     await verifyTaskInDashboard(taskTitleUpdate, deadLineInDaysUpdate, taskType, taskStatusUpdate);

    // Delete the created task
    await dashboardPage.deleteTheTaskFromDashboardPage();
    // If possible, this can be improved with different test structure. This is a quick solution as Delete API request is interupted with test execution and task is not deleted. 
    await page.waitForTimeout(2000)
})

test ('Check task deletion in Topics Tasks', async({page})=>{

    const testTopic = 'Test Topic'
    const taskTitle = 'QA test';
    const taskDescription = 'Test description';
    const deadLineInDays = '17';

     // Precondition: create a task to delete 
    /*
    - if create task API is available can be used as a before test action. 
    - tests can also be orginized as ordered tests, where createTask test will ensure task for delete exists. 
    */
    await helpers.createTaskForTopic(testTopic, taskTitle, taskDescription, deadLineInDays);

    await taskPage.taskTabOnTaskList(taskTitle).click();
    await taskPage.deleteTaskButton.click();

    // Additional verification for Task deletion in the Task list should be implemented. Due to time limit, verification is limited to values presented in dashboard. 
    
    // Navigate to Dashboard
    await dashboardPage.dashboardButton.click();

    // Verify task is deleted from dashboard
    await expect(dashboardPage.taskTitle(taskTitle)).not.toBeVisible();
    await expect(dashboardPage.noResultImage).toBeVisible();
})

/**
 * Helper function to verify task details on the dashboard.
 * @param {string} taskTitle - Title of the task.
 * @param {number} expectedDeadline - Expected deadline day.
 * @param {string} taskTitle - Type of the task.
 * @param {string} taskTitle - Status of the task.
 */
async function verifyTaskInDashboard(expectedTitle, expectedDeadline, expectedType, expectedStatus) {

    // Verify under 'My VERSO Tasks' tab
    await expect(dashboardPage.taskTitle(expectedTitle)).toBeVisible();
    await expect(dashboardPage.taskAssignedToIcon).toBeVisible();
    await expect(dashboardPage.taskType).toBeVisible();
    await expect(dashboardPage.taskType).toHaveText(expectedType);
    await expect(dashboardPage.taskDeadline(expectedDeadline.toString())).toBeVisible();
    await expect(dashboardPage.taskStatus(expectedStatus)).toBeVisible();
    await expect(dashboardPage.taskStatus(expectedStatus)).toContainText(expectedStatus);
    await expect(dashboardPage.taskDeleteButton).toBeVisible();

    // Verify under 'Created by Me' tab
    await expect(dashboardPage.createdByMeTab).toBeVisible();
    await dashboardPage.createdByMeTab.click();
    await expect(dashboardPage.taskTitle(expectedTitle)).toBeVisible();
    await expect(dashboardPage.taskType).toBeVisible();
    await expect(dashboardPage.taskType).toHaveText(expectedType);
    await expect(dashboardPage.taskDeadline(expectedDeadline.toString())).toBeVisible();
    await expect(dashboardPage.taskStatus(expectedStatus)).toBeVisible();
    await expect(dashboardPage.taskStatus(expectedStatus)).toContainText(expectedStatus);
    await expect(dashboardPage.taskDeleteButton).toBeVisible();
}