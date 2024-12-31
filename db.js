const mysql = require('mysql');
const { MongoClient } = require('mongodb');

// Creates the connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql',
});

// Connects to the MySQL database
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'proj2024';
let mongoDb;

const connectMongoDB = async () => {
    if (!mongoDb) {
        const client = await MongoClient.connect(mongoUrl);
        mongoDb = client.db(dbName);
        console.log(`MongoDB Connected: ${dbName}`);
    }
    return mongoDb;
};

module.exports = { db, connectMongoDB };
