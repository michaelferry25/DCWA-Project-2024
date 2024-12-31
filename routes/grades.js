const express = require('express');
const db = require('../db');
const router = express.Router();

//Route to display the grades page on the webpage
router.get('/', (req, res) => {

    //This sql query fetches student names,module names and grades
    //Also makes sure all students are shown even if they dont have any modules
    const sql = `
        SELECT 
            student.name AS student_name,
            module.name AS module_name,
            grade.grade
        FROM student
        LEFT JOIN grade ON student.sid = grade.sid
        LEFT JOIN module ON grade.mid = module.mid
        ORDER BY student.name ASC, grade.grade ASC;
    `;

    //Executes the query for the grades
    db.db.query(sql, (err, results) => {
        if (err) throw err;
        
        //Renders the grades page with the data
        res.render('grades', { grades: results });
    });
});

module.exports = router;
