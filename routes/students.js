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

module.exports = router;
