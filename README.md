# Manage Vehicle AI

#### Prerequisites

Before you begin, ensure your system has the following dependencies installed:

- Docker: Version 20.10.7 or higher
- Node.js: Version 20.10.0 or higher
- pnpm (Package Manager): Version 6.16.1 or higher

#### Setup

1. **Unzip the file**

   Use the zip file to unzip and setup the project

2. **Install the dependencies**
   This step installs the dependency in apps and packages

   ```bash
   pnpm install
   ```

3. **Bootstrap Server Services**

   This step installs the dependencies and runs all necessary services in Docker, as well as scripts to set up the project:

   ```bash
   cd apps/server
   ```

   ```bash
   pnpm bootstrap
   ```

4. **Setup .env**

   Setup the env file a/c to .env.example

5. **Run the Project**

   Initiate the Rahat Core by executing the following commands in separate terminals:

   ```bash
   pnpm dev
   ```
