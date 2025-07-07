const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const { validateFormInput } = require('./fonctions');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

// Form handling
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;
  if (!validateFormInput({ name, email })) {
    return res.status(400).send('Invalid input');
  }

  await db.promise().query('INSERT INTO submissions (name, email) VALUES (?, ?)', [name, email]);
  res.status(201).send('Form submitted successfully');
});

app.get('/submissions', async (req, res) => {
  const [rows] = await db.promise().query('SELECT * FROM submissions');
  res.json(rows);
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
