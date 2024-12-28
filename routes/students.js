const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM student ORDER BY sid';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('students', { students: results });
    });
});

router.get('/add', (req, res) => {
    res.render('addStudent');
});

router.post('/add', (req, res) => {
    const { sid, name, age } = req.body;
    const sql = 'INSERT INTO student (sid, name, age) VALUES (?, ?, ?)';
    db.query(sql, [sid, name, age], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

router.get('/update/:sid', (req, res) => {
    const { sid } = req.params;
    const sql = 'SELECT * FROM student WHERE sid = ?';
    db.query(sql, [sid], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Student not found');
        }
        res.render('updateStudent', { student: results[0], errors: {} });
    });
});

router.post('/update/:sid', (req, res) => {
    const { sid } = req.params;
    const { name, age } = req.body;
    const errors = {};

    if (!name || name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    if (!age || age < 18) {
        errors.age = 'Age must be 18 or older';
    }

    if (Object.keys(errors).length > 0) {
        return res.render('updateStudent', { student: { sid, name, age }, errors });
    }

    const sql = 'UPDATE student SET name = ?, age = ? WHERE sid = ?';
    db.query(sql, [name, age, sid], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

module.exports = router;
