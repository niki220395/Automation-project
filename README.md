# Automation-project

## Prerequisites

### 1. Install Required Dependencies
- **Node.js** (LTS version recommended) → [Download here](https://nodejs.org/)
- **Playwright** installed globally or in the project

### 2. Setting Up Environment Variables
If you want to run tests locally, you will need to create your own **.env** file to store credentials for the login flow.

#### **Steps to create the .env file:**
1. In the root folder of the project, create a `.env` file.
2. Add the following values:
   ```ini
   USERNAME=yourUserName
   PASSWORD=yourPassword

### 3. Configure CI/CD Variables (Optional)
- For remote test execution, environment variables need to be added as **CI/CD variables** on **GitLab**.
- You must have **maintainer access** to the project to set this up.
- This setup is **out of scope for now** and will be covered later.

### 4. Run Tests
- Open a terminal in the project folder.
- Run the following command to execute tests in **headed mode**:
  ```sh
  npx playwright test --headed
