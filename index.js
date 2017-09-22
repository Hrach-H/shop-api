const express = require('express'),
    session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();

mongoose.connect('mongodb://localhost/shop', {
    useMongoClient: true
});
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected');
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'fhu78Sdhuh7123SDFhhasd',
    resave: false, // Save session only whenever changes are made to the data
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function() {
    console.log('Now listening for requests');
});