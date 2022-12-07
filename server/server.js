const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { networkInterfaces } = require('os');

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

// delete request for students
app.delete('/api/students/:studentId', cors(), async (req, res) => {
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
    return res.status(400).json({ e });
  }
});

// create the POST request for TAGS
app.post('/api/tags', cors(), async (req, res) => {
  const newTag = { name: req.body.name };
  console.log([newTag.name]);
  const result = await db.query(
    'INSERT INTO tags(name) VALUES($1) RETURNING *',
    [newTag.name],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// delete request for Tags
app.delete('/api/tags/:tagId', cors(), async (req, res) => {
  const tagId = req.params.tagId;
  //console.log("From the delete request-url", studentId);
  await db.query('DELETE FROM tags WHERE tagid=$1', [tagId]);
  res.status(200).end();

});

// create the get request for tags for an especific student
app.get('/api/students/:studentId/tags', cors(), async (req, res) => {
  let studentId = req.params.studentId;
  try {
    const { rows: tags } = await db.query('SELECT tags.tagid, tags.name, tagsforstudents.taggeddate FROM tags JOIN tagsforstudents ON tags.tagid=tagsforstudents.tags_pkey WHERE tagsforstudents.students_pkey=$1', [studentId]);
    res.send(tags);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request for adding tags to an student
app.post('/api/students/:studentId/tags', cors(), async (req, res) => {
  const newTagForStudent = {
    students_pkey: req.params.studentId,
    tags_pkey: req.body.tagid
  };
  console.log([newTagForStudent.students_pkey, newTagForStudent.tags_pkey]);
  const result = await db.query(
    'INSERT INTO tagsforstudents(students_pkey, tags_pkey, taggeddate) VALUES($1, $2, now()) RETURNING *',
    [newTagForStudent.students_pkey, newTagForStudent.tags_pkey],);
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});