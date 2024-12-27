const express = require('express');
const router = express.Router();

// Route for the Home page
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        links: [
            { name: 'Students', path: '/students' },
            { name: 'Grades', path: '/grades' },
            { name: 'Lecturers', path: '/lecturers' }
        ]
    });
});

module.exports = router;
