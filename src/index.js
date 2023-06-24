const express = require('express');
const path = require('path');

const db = require('./config/db');
const home = require('./routes/index.js');

const app = express();
const port = 8080;
const hostname = "localhost";

//Connect to MongoDB
db.connect();

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use('/', home);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})