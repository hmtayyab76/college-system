const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Configure the MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'C4Z1dc@N',
  database: 'college_students'
});

app.get('/', function(req, res) {
  let sql = 'SELECT * FROM STUDENT_INFO';
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
  });
}); 



// POST route to add a new student
app.post('/students', function(req, res) {
  const { student_name, student_email, student_address, student_department, student_age } = req.body;
  const createdAt = new Date();
  let sql = 'INSERT INTO STUDENT_INFO (student_name, student_email, student_address, student_department, student_age, createdAt) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [student_name, student_email, student_address, student_department, student_age, createdAt], function(err, result) {
    if (err) {
      console.error("There was an error adding the student data!", err);
      res.status(500).send("There was an error adding the student data!");
    } else {
      res.status(201).send({ student_id: result.insertId, ...req.body, createdAt });
    }
  });
});

// DELETE route to delete a student
app.delete('/students/:id', function(req, res) {
  const studentId = req.params.id;
  let sql = 'DELETE FROM STUDENT_INFO WHERE student_id = ?';
  connection.query(sql, [studentId], function(err, result) {
    if (err) {
      console.error("There was an error deleting the student data!", err);
      res.status(500).send("There was an error deleting the student data!");
    } else {
      res.status(200).send({ message: "Student deleted successfully!" });
    }
  });
});

// PUT route to update a student
app.put('/students/:id', function(req, res) {
  const studentId = req.params.id;
  const { student_name, student_email, student_address, student_department, student_age } = req.body;
  let sql = 'UPDATE STUDENT_INFO SET student_name = ?, student_email = ?, student_address = ?, student_department = ?, student_age = ? WHERE student_id = ?';
  connection.query(sql, [student_name, student_email, student_address, student_department, student_age, studentId], function(err, result) {
    if (err) {
      console.error("There was an error updating the student data!", err);
      res.status(500).send("There was an error updating the student data!");
    } else {
      res.status(200).send({ message: "Student updated successfully!" });
    }
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL');
  });
});