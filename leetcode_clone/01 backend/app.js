const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const USERS = [];
const SUBMISSIONS = [];
const QUESTIONS = [];

app.use(express.json());

// Check if email already exists
const emailExists = (email) => {
  return USERS.some(u => u.email === email);
}

// Check if username already exists
const usernameExists = (username) => {
  return USERS.some(u => u.username === username);
}

// Generate a random token
const generateToken = () => {
  return Math.random().toString(36).substring(3, 8);
}

// Check if token already exists
const tokenExist = (token) => {
  return USERS.some(u => u.token === token);
}

// POST endpoint to sign up a new user
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are present
  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }

  // Check if email or username already exists
  if (emailExists(email)) {
    return res.status(400).send('Email already exists');
  }
  if (usernameExists(username)) {
    return res.status(400).send('Username already exists');
  }

  // Generate a unique token
  let token;
  do {
    token = generateToken();
  } while (tokenExist(token));

  // Assign an ID and token to the new user
  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
    token
  };

  // Push the new user to the USERS array
  USERS.push(newUser);

  // Send the token as response
  res.send(`Your token number is ${token}`);
});

// GET endpoint to retrieve all registered users with their email and password
app.get('/all-users', (req, res) => {
  const userDetails = USERS.map(u => ({
    username: u.username,
    email: u.email,
    password: u.password
  }));
  res.json(userDetails);
});

// POST endpoint to submit a solution
app.post('/submission', (req, res) => {
  const { username, questionId, solution } = req.body;

  // Check if user exists
  const foundUser = USERS.find(u => u.username === username);
  if (!foundUser) {
    return res.status(400).send('User not found');
  }

  // Check if the question exists
  const foundQuestion = QUESTIONS.find(q => q.id === questionId);
  if (!foundQuestion) {
    return res.status(400).send('Question not found');
  }

  // Create a new submission
  const newSubmission = {
    id: uuidv4(),
    userId: foundUser.id,
    questionId,
    solution,
    submissionAt: new Date(),
  };

  // Add the submission to the SUBMISSIONS array
  SUBMISSIONS.push(newSubmission);

  // Send a success response
  res.status(201).send({ username: `${username}`, message: 'Submission received', submissionId: newSubmission.id });
});

// POST endpoint to log in a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Find the user by email
  const user = USERS.find(u => u.email === email);

  // Check if user exists and if the password matches
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }

  // Send the token as response
  res.send(`Your token is ${user.token}`);
});

// POST endpoint for admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Check if all required fields are present
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Authenticate admin
  if (username === 'admin' && password === 'adminpassword') {
    // Generate admin token
    const adminToken = generateToken();
    return res.send(`Admin token: ${adminToken}`);
  } else {
    return res.status(401).send('Invalid admin credentials');
  }
});

// POST endpoint to add a new question (only accessible to admin)
app.post('/question/add', (req, res) => {
  const { headline, text, difficulty } = req.body;

  // Check if all required fields are present
  if (!headline || !text || !difficulty) {
    return res.status(400).send('Headline, text, and difficulty are required');
  }

  // Generate question ID
  const questionId = uuidv4();

  // Create a new question object
  const newQuestion = {
    id: questionId,
    headline,
    text,
    difficulty,
  };

  // Push the new question to the QUESTIONS array
  QUESTIONS.push(newQuestion);

  // Send a success response
  res.status(201).send(`Question added with ID: ${questionId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
