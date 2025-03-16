const DashboardPage = require('../pages/DashboardPage');
const TaskPage = require('../pages/TaskPage');
const TopicsPage = require('../pages/TopicsPage');

class TestHelpers {

    constructor(page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.taskPage = new TaskPage(page);
        this.topicsPage = new TopicsPage(page);

    }

    /**
     * Creates a task for specified topic.
     * 
     * @param {string} topicTitle The title of the topic to create task.
     * @param {string} taskTitle The title of the newly created task.
     * @param {string} taskDescription The description of the newly created task.
     * @param {number} deadline The deadline of the newly created task.
     */
    async createTaskForTopic(topicTitle, taskTitle, taskDescription, deadline) {
        
        await this.topicsPage.navigateToTopicTasks(topicTitle);
        await this.taskPage.addTaskButton.click();
        await this.taskPage.newTaskPlaceholder.click();
        await this.taskPage.fillTaskDetails(taskTitle, taskDescription, deadline);
        await this.taskPage.saveTaskButton.click();
    }
}
module.exports = TestHelpers;
