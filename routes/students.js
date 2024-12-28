const express = require('express');
const db = require('../db');
const router = express.Router();

// Route that displays all students
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM student ORDER BY sid';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('students', { students: results });
    });
});

// Route that renders the add student page
router.get('/add', (req, res) => {
    res.render('addStudent', { errors: {}, student: {} });
});

// The route to handle adding a new student
router.post('/add', (req, res) => {
    const { sid, name, age } = req.body;
    const errors = {};

    //Validates a new students details
    if (!sid || sid.length !== 4) {
        errors.sid = 'Student ID should be 4 characters';
    }
    if (!name || name.length < 2) {
        errors.name = 'Student Name should be at least 2 characters';
    }
    if (!age || age < 18) {
        errors.age = 'Student Age should be at least 18';
    }

    //this renders the form again if there are issues or validation errors
    if (Object.keys(errors).length > 0) {
        return res.render('addStudent', { errors, student: { sid, name, age } });
    }

    // This is the sql query to insert a new student
    const sql = 'INSERT INTO student (sid, name, age) VALUES (?, ?, ?)';
    db.query(sql, [sid, name, age], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

// The route to render the Update Student page
router.get('/edit/:sid', (req, res) => {
    const { sid } = req.params;

    //sql query to fetch details of the student to be updated
    const sql = 'SELECT * FROM student WHERE sid = ?';
    db.query(sql, [sid], (err, results) => {
        if (err) throw err;
        //Checks if the query returned any results; if not, send a 404 error message that it couldnt find the student 
        if (results.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.render('updateStudent', { student: results[0], errors: {} });
    });
});

//The route to handle updating a student
router.post('/edit/:sid', (req, res) => {
    const { sid } = req.params;
    const { name, age } = req.body;
    const errors = {};

    //to validate updated details, the program returns these error messages if ranges/entries are not valid
    if (!name || name.length < 2) {
        errors.name = 'Student Name should be at least 2 characters';
    }
    if (!age || age < 18) {
        errors.age = 'Student Age should be at least 18';
    }

    // This re renders the Update form again if there are validation errors
    if (Object.keys(errors).length > 0) {
        return res.render('updateStudent', { student: { sid, name, age }, errors });
    }

    //The sql query to update the student details
    const sql = 'UPDATE student SET name = ?, age = ? WHERE sid = ?';
    db.query(sql, [name, age, sid], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

module.exports = router;
