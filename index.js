require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const user = require("./routes/user");
const InitiateMongoServer = require('./config/db');
const pingmydyno = require('pingmydyno');

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Working' });
});

app.use('/user', user);


app.listen(PORT, (req, res) => {
    console.log(`Server Started: PORT ${PORT}`);
});