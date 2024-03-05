const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './data/users.json';

app.use(bodyParser.json());

// GET all users
app.get('/api/users', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// POST new user 
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(DATA_FILE, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json(newUser);
    });
  });
});

// PUT (replace) user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let users = JSON.parse(data);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    users[index] = updatedUser;
    fs.writeFile(DATA_FILE, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(updatedUser);
    });
  });
});

// PATCH (update) user by ID
app.patch('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedFields = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let users = JSON.parse(data);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    Object.assign(users[index], updatedFields);
    fs.writeFile(DATA_FILE, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(users[index]);
    });
  });
});

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let users = JSON.parse(data);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    users.splice(index, 1);
    fs.writeFile(DATA_FILE, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.sendStatus(204);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
