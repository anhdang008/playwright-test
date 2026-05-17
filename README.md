1. Project: Playwright test
2. Prerequisites
- Node.js
- Playwright
- A modern browser (Chrome, Firefox, or WebKit)
3. How to install dependencies
- Install dependencies: npm install
- Install Playwright: npm init playwright@latest
- Clone project
4. How to run the tests
- Run all tests: npx playwright test
- Run tests in a specific browser: npx playwright test --project=chromium/firefox/webkit
- Run a specific test file: npx playwright test tests/time-is.spec.ts
- View report: npx playwright show-report
5. Project structure: Page object model
- api/                                    # Test files (spec files)
  - githubOrganization.service.ts         # Define step for API get repo
- page/                                   # Page Object Model classes
  - basePage.ts                           # Define common step
  - timeIsPage.ts                         # Define step to interact with the website time.is
- tests/                                  #Test script
  - github-organization.spect.ts          # Script for Task 2
  - time-is.spect.ts                      # Script for Task 1
- utilities/                              # Helper functions and utilities
  - browserHelper.ts
- playwright.config.ts                     # Playwright configuration
- package.json
- README.md
