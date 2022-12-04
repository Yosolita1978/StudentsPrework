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
  
  // create the get request for students
  app.get('/api/students', cors(), async (req, res) => {
    try {
      const { rows: students } = await db.query('SELECT * FROM students');
      res.send(students);
    } catch (e) {
      return res.status(400).json({ e });
    }
  });

  // create the POST request for students
app.post('/api/students', cors(), async (req, res) => {
    const newStudent = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    console.log([newStudent.firstname, newStudent.lastname]);
    const result = await db.query(
      'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
      [newStudent.firstname, newStudent.lastname],
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  });

  // delete request
app.delete('/api/students/:studentId', cors(), async (req, res) =>{
  const studentId = req.params.studentId;
  //console.log("From the delete request-url", studentId);
  await db.query('DELETE FROM students WHERE studentid=$1', [studentId]);
  res.status(200).end();

});


  // create the get request for tags
  app.get('/api/tags', cors(), async (req, res) => {
    try {
      const { rows: tags } = await db.query('SELECT * FROM tags');
      res.send(tags);
    } catch (e) {
      return res.status(400).json({e });
    }
  });

  

  // console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
  });