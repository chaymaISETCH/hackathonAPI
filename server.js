
/*Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin
 policy and access resources from remote hosts.*/
var cors = require('cors');




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/users');
const challenges = require('./routes/challenges');
const hackathons = require('./routes/hackathons');
const teams = require('./routes/teams');

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {

    "origin": "http://localhost:3000",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Credentials": true,
    "credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}
app.use(cors(corsOptions));


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);




app.use('/api/users', users);
app.use('/api/challenges', challenges);
app.use('/api/hackathons', hackathons);
app.use('/api/teams', teams);
app.get('/', function (req, res) {
    res.send('hello');
});

const PORT = 8888;


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});