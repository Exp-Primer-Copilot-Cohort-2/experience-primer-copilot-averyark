// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Read comments from JSON file
const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Use the body-parser module to parse the body of POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the web server
app.use(express.static('public'));
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add a new comment to the JSON file
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Start the web server
app.listen(port, () => {
  console.log(`Web server listening at http://localhost:${port}`);
});