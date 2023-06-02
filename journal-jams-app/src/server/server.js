const express = require('express');
const mongoose = require('mongoose');
const Entry = require('../Models/Entries'); 
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require( 'body-parser');

//express app
const app = express();

dotenv.config({path: 'src/server/.env'}); //reads the .env file and parses it
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static('src'));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('Connected to database'),
    app.listen(1234);
});

app.post('/api/newEntry', (req, res) => { //add the newEntry to the DB
    const new_entry = new Entry({
        title: req.body.title,
        text: req.body.entry,
        mood: "happy" //placeholder-- TODO: set to predicted mood
    });

    new_entry.save()
        .then((result) => {
            console.log("Sent your entry to the DB!");
            res.redirect('http://localhost:3000/Entries')
        })
        .catch((err) => {
            console.log(err);
        });
});