const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function() {
    console.log('Now listening for requests');
});