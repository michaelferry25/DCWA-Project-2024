const mysql = require('mysql');

// Creates the connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql'
});

//Connects to the database and returns the message in the console
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected');
});

module.exports = db;
