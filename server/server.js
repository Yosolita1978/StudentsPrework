const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS' });
  });
  
  // create the get request
  app.get('/api/students', cors(), async (req, res) => {
    try {
      const { rows: students } = await db.query('SELECT * FROM students');
      res.send(students);
    } catch (e) {
      return res.status(400).json({ e });
    }
  });

  // console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
  });