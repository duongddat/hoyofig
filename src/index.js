const express = require('express');
const path = require('path');

const app = express();
const port = 8081;
const hostname = "localhost";

//Config template engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '');

//routes
app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})