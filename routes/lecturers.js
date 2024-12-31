const express = require('express');
const { connectMongoDB } = require('../db');
const { db } = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const mongoDb = await connectMongoDB();
        const lecturers = await mongoDb.collection('lecturers').find().toArray();
        res.render('lecturers', { lecturers });
    } catch (error) {
        console.error('Error fetching lecturers:', error.message);
        res.status(500).send('Error fetching lecturers');
    }
});

router.get('/delete/:id', async (req, res) => {
    const lecturerId = req.params.id;

    const query = 'SELECT * FROM module WHERE lecturer = ?';
    db.query(query, [lecturerId], async (error, results) => {
        if (error) {
            console.error('Error checking module associations:', error.message);
            res.status(500).send('Error checking module associations');
            return;
        }

        if (results.length > 0) {
            res.send(`<h1>Error Message</h1>
                <p>Cannot delete lecturer ${lecturerId}. He/She has associated modules.</p>
                <a href="/lecturers">Back to Lecturers</a>
            `);
        } else {
            try {
                const mongoDb = await connectMongoDB();
                await mongoDb.collection('lecturers').deleteOne({ _id: lecturerId });
                res.redirect('/lecturers');
            } catch (deleteError) {
                console.error('Error deleting lecturer:', deleteError.message);
                res.status(500).send('Error deleting lecturer');
            }
        }
    });
});

module.exports = router;
