const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(bodyParser.json());

// MiddleWares
app.use(express.static("./client/build"));

// Import Routes
const organiserRoute = require('./routes/organiser');
const memberRoute = require('./routes/member');
const homeRoute = require('./routes/home');

// Use Routes
app.use(cors());
app.use('/organiser', organiserRoute);
app.use('/member', memberRoute);
app.use('/', homeRoute);

// Connect to DB
mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true },
    () => console.log('Connected to DB!')
);


// Listen to Server
app.listen(5000);