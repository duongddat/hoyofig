const express = require('express');
const path = require('path');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const db = require('./config/db');
const home = require('./routes/index.js');
const category = require('./routes/adminCategory');
const product = require('./routes/adminProduct');
const trash = require('./routes/trash');
const cart = require('./routes/cart');
const user = require('./routes/user');

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

//Overrides methods in express
app.use(methodOverride('_method'));

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set global errors variable
app.locals.errors = null;

//Express message middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

//Passport Config
require('./app/middlewares/passport')(passport);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Cart session middleware
app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
})


//routes
app.use('/admin/trash', trash);
app.use('/admin', category);
app.use('/admin', product);
app.use('/cart', cart);
app.use('/user', user);
app.use('/', home);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})