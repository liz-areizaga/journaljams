const express = require('express');
const mongoose = require('mongoose');
const Entry = require('../Models/Entries'); 
const User = require('../Models/UserInfo');
const profilepic = require('../Models/ProfilePics');
const FriendList = require('../Models/FriendLists');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require( 'body-parser');
const routes = require('./routes/profilepic_backend.js');

//express app
const app = express();

dotenv.config({path: 'src/server/.env'}); //reads the .env file and parses it
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static('src'));
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('Connected to database'),
    app.listen(1234);
});

app.post('/api/newUserFriendList/:email', (req, res) => {
    console.log("Inside of /api/newUserFriendList");
    try {
      const email = req.params.email;
      const friends = req.body.friends;
  
      FriendList.findOne({ email: email })
        .then((existingFriendList) => {
          if (existingFriendList) {
            // Document with the email already exists, update the friends field
            existingFriendList.friends = friends;
            existingFriendList.save()
              .then((result) => {
                console.log(`Updated ${email}'s friend list in the DB!`);
                // console.log(result);
                res.send(result);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
              });
          } else {
            // Document with the email does not exist, create a new one
            const new_entry = new FriendList({
              email: email,
              friends: friends
            });
            new_entry.save()
              .then((result) => {
                console.log(`Added ${email}'s friend list to the DB!`);
                res.send(result);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Internal Server Error');
        });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
  


app.post('/api/newProfilePic', upload.single('image'), async (req, res) => {
    console.log('Inside of /api/newProfilePic');
    const image = new profilepic({
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });
    image.save()    
        .then((result) => {
            console.log("Sent your profile pic to the DB!");
            res.json({ id: image._id });
            // res.send(result);
        })
        .catch((err) => {
            console.error('Failed to upload image', err);
            // res.status(500).json({ error: 'Failed to upload image' });
        });
});

app.post('/api/newUser/:email', (req, res) => { //add the newEntry to the DB
    console.log("Inside of /api/newUser");
    const new_entry = new User({
        email: req.params.email,
    });
    new_entry.save()
        .then((result) => {
            console.log("Sent your username to the DB!");
            res.send(result);
            // res.redirect('http://localhost:3000/login')
        })
        .catch((err) => {
            console.log(err);
        });
});


app.post('/api/newEntry', (req, res) => { //add the newEntry to the DB
    const new_entry = new Entry({
        user: req.body.user,
        title: req.body.title,
        text: req.body.entry,
        mood: "happy" //placeholder-- TODO: set to predicted mood
    });

    new_entry.save()
        .then((result) => {
            console.log("Sent your entry to the DB!");
            // res.redirect('http://localhost:3000/Entries')
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/api/allEntries/:user', (req, res) => {
    console.log("Inside of /api/allEntries/:user");
    const user = req.params.user;
    // Entry.find({email})
    Entry.find({user})
        .select('title text')
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/api/allUsers', (req, res) => {
    console.log("Inside of /api/allUsers");
    User.find()
        .select('email')
        .then((result) => {
            // console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/api/userfriendList/:email', (req, res) => {    
    console.log("Inside of /api/userfriendList/:email");
    const email = req.params.email;
    FriendList.findOne({ email })
        .select('friends')
        .then((result) => {
            console.log(result.friends);
            res.send(result.friends);
        })
        .catch((err) => {
            console.log(err);
        });
  });
  
    
  
// app.use('/api', routes);
