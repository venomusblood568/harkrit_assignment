# leetcode clone (just for learning purpose) backend part

# Technologies Used

01. **Node.js**: A powerful JavaScript runtime environment that allows executing JavaScript code server-side.
02. **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
03. **Nodemon**: A command-line tool that enhances the development workflow for Node.js applications by automatically restarting the server upon detecting changes in the project directory.
4. **uudi**: A popular npm package for generating universally unique identifiers (UUIDs) in JavaScript and Node.js. It supports multiple versions (v1, v3, v4, v5) and is ideal for creating unique database keys, session IDs, and more.



## Beginner Tasks
- [x] **Setup Express Application**
  - [x] Install Express and set up the basic server structure.
  - [x] Ensure the server is running on the specified port (3001).

- [x] **Create `USERS` Array**
  - [x] Define an empty `USERS` array.
  - [x] Users must provide name, email, and password.
  - [x] Ensure the email is unique.
  - [x] Ensure the username is unique.
  - [x] Return a random token unique for each user. 

- [x] **Create `QUESTIONS` Array**
  - [x] Define a `QUESTIONS` array with a sample question.

- [ ] **Create `SUBMISSION` Array**
  - [ ] Define an empty `SUBMISSION` array to store user submissions.

- [ ] **Implement `/signup` Route**
  - [ ] Decode request body to extract email and password.
  - [ ] Check if the user with the given email already exists.
  - [ ] If not, store the email and password in the `USERS` array.
  - [ ] Return a 200 status code.

- [ ] **Implement `/login` Route**
  - [ ] Decode request body to extract email and password.
  - [ ] Check if the user exists in the `USERS` array.
  - [ ] Verify the password.
  - [ ] If valid, return a 200 status code and a token (random string).
  - [ ] If invalid, return a 401 status code.

## Intermediate Tasks
- [ ] **Implement `/questions` Route**
  - [ ] Return all questions from the `QUESTIONS` array to the client.

- [ ] **Implement `/submissions` GET Route**
  - [ ] Return all submissions from the `SUBMISSION` array to the client.

- [ ] **Implement `/submissions` POST Route**
  - [ ] Allow users to submit solutions.
  - [ ] Randomly accept or reject the solution.
  - [ ] Store the submission in the `SUBMISSION` array.

## Advanced Tasks
- [ ] **Create Admin-Only Route to Add New Problem**
  - [ ] Create a new route that allows an admin to add a new problem.
  - [ ] Ensure that only admins can access this route.
  - [ ] Add logic to verify if the user is an admin.

## Optional Enhancements
- [ ] **Enhance Security**
  - [ ] Encrypt passwords before storing them.
  - [ ] Use JWT or similar for generating and verifying tokens.

- [ ] **Improve Error Handling**
  - [ ] Add appropriate error messages and status codes for different failure cases.

- [ ] **Add Data Validation**
  - [ ] Validate input data for all routes to ensure it meets expected formats and constraints.

- [ ] **Testing**
  - [ ] Write tests for each route to ensure they work as expected.
  - [ ] Implement unit tests and integration tests.
