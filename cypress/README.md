# Cypress Tests : User Registration, Login, and Post Shift

This repository contains Cypress tests to validate:

- **User Registration**
- **User Login**
- **Posting a Shift**

---

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── register.cy.js       # Tests for user registration flow
│   ├── login.cy.js          # Tests for login functionality
│   └── post_shift.cy.js     # Tests for posting a shift
├── fixtures/
│   └── user.json            # Static test data for users
└── support/
    ├── commands.js          # Custom Cypress commands
    └── selectors.js         # Centralized element selectors
    └── e2e.js               

```

---

## Setup Instructions

### Install Cypress

```bash
npm install cypress
```

### 3. 🧪 Run Tests

#### GUI Mode (Interactive)

```bash
npx cypress open
```

- Select **E2E Testing**
- Choose your preferred browser (Tested on Chrome)
- Run the desired `.cy.js` test file

#### CLI Mode (Headless / CI)

```bash
npx cypress run --e2e
```

To run a specific test file:

```bash
npx cypress run --e2e --spec "cypress/e2e/register.cy.js"
```

---

## Code Coverage
This project uses Cypress + Istanbul to track frontend test coverage.

To generate and view the code coverage make sure both frontend and backend are running then run 

```bash 
npm run cy:coverage ; open coverage/index.html
```

## TODO

### Register
- [ ] Remember Me
- [ ] Register using Facebook/ Twitter.

### Login
- [ ] Forgot Password.

## Shift
- [ ] Check if shift appears in shift list/dashboard after submission.
- [ ] Try posting a shift with an extremely short or long title/description.

---

## Enhancements

- Integrate with CI/CD pipelines (Jenkins) for automated regression testing.
- Integrate with external test management tools (e.g. TestRail)

---