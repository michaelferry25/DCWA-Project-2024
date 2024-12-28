const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sets ejs as engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes to each page
app.use('/', require('./routes/home'));
app.use('/students', require('./routes/students'));
app.use('/grades', require('./routes/grades'));

//Starts the server
const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
