# Automation-project

## Prerequisites
- Node.js (LTS version recommended) → [Download here](https://nodejs.org/)
- Playwright installed globally or in the project
- If you want to run tests locally you will need to create your own .env file where you will provide your credentials for the login flow.
- Create .env file in root folder and put these two values in it:
  USERNAME=yourUserName
  PASSWORD=yourPassowrd
- To access them add these two lines in your playwright.config.js
  import dotenv from 'dotenv';
  dotenv.config();
- You can access them like this:
  process.env.USERNAME
  process.env.PASSWORD
- For the remote run we will need to add these values as a CI/CD variables on GitLab (you need to be a maintainer of the project to do that). This is will be out of the scope for now.
- To run tests, open the terminal and run this command "npx playwright test --headed"
