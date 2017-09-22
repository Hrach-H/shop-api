const express = require('express'),
    session = require('express-session');
const mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
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
app.use(session({
    secret: 'fhu78Sdhuh7123SDFhhasd',
    resave: false, // Save session only whenever changes are made to the data
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection, // Reusing our connection
        ttl: 2 * 24 * 60 * 60 // 'time to live' - session expiration date (2 days * 24 hours * 60 minutes * 60 seconds)
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 3001, function() {
    console.log('Now listening for requests');
});