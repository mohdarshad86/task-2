const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

app.use(express.json());
app.use(cors())

// API endpoints
app.get('/api/notes', (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY timestamp DESC';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/notes', (req, res) => {
  try {
    console.log('request recieved');
    const { title, content } = req.body;
    const timestamp = new Date().toISOString();

    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    connection.query(sql, [title, content], (error, results) => {
      if (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const addedNote = 'SELECT * FROM notes where id=' + results.insertId;
        connection.query(addedNote, (error, results) => {
          if (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            console.log('Note added successfully!', results);
            res.status(201).send(results);
          }
        });

      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM notes WHERE id = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Note deleted successfully!');
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});