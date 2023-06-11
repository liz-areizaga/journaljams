const express = require('express');
const mongoose = require('mongoose');
const Entry = require('../Models/Entries'); 
const User = require('../Models/UserInfo');
const Message = require('../Models/Messages');
const userRoom = require('../Models/Rooms');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require( 'body-parser');
const socketIO = require('socket.io');
const http = require('http');
const cors  = require("cors");
const session = require('express-session');

//express app
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});
app.use(cors({origin: 'http://localhost:3000', credentials: true}))

//socket is the connection you have to the specific user
//io is general to all 
io.on('connection', (socket) => { 
    let room = undefined;
    let userName = undefined;
    console.log("user Connected")
    socket.on("disconnect", () => {
        console.log("user Disconnected")
    })
    socket.on("chat message", (data) => {
        console.log("got message", data)
        io.to(room).emit("chat message", data)
    })
    socket.on("join", (data) => {
        socket.join(data.room)
        room = data.room
        userName = data.userName
        console.log("got message", data)
        console.log(`user is joined to room ${data.room}`)
    })

    socket.emit("starting data", {"text": "hi"})
    
})

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
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
      });
});

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
})

app.get('/', (req, res) => {
    console.log("in api home");
});

const createdRooms = [];
app.get('/api/rooms', (req, res) => {
    res.json(createdRooms);
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

app.post('/api/newMessage', (req, res) => {
    const room = req.body.room;
    const userName = req.body.username; // Corrected typo in "username" variable name
    const message = req.body.message;
  
    // Find the document for the specified room
    Message.findOne({ room: room })
      .then((foundMessage) => {
        if (foundMessage) {
          // Append the new message to the existing messages array
          foundMessage.messages.push({
            user: userName,
            message: message
          });
  
          // Save the updated document
          return foundMessage.save();
        } else {
          // If the document for the specified room doesn't exist, create a new one
          const newMessage = new Message({
            room: room,
            messages: [{
              user: userName,
              message: message
            }]
          });
  
          // Save the new document
          return newMessage.save();
        }
      })
      .then(() => {
        console.log("Sent your message to the DB!");
        res.status(200).json({ message: 'Message saved successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Failed to save the message' });
      });
  });

  app.post('/api/newRoom/:user/:room', (req, res) => {
    console.log("Inside of /api/newRoom/:user/:room");
    const { user, room } = req.params;
    userRoom.findOne({ user })
      .then((userDoc) => {
        if (userDoc) {
          // Check if the room already exists in the user's rooms array
          if (userDoc.rooms.includes(room)) {
            throw new Error("Room already exists for the user");
          }
          userDoc.rooms.push(room); // Append the new room to the existing rooms array
          return userDoc.save(); // Save the updated user document
        } else {
          return userRoom.create({ user, rooms: [room] }); // Create a new user document with the new room
        }
      })
      .then((result) => {
        console.log("Sent your room to the DB!");
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });
  

app.get('/api/allEntries', (req, res) => {
    console.log("Inside of /api/allEntries");
    Entry.find()
        .then((result) => {
            // console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/api/allMessages/:room', (req, res) => { //get messages of specific room
    console.log("Inside of /api/allMessages/:room");
    const room = req.params.room;
    Message.findOne({room: room}, {'messages.user': 1, 'messages.message': 1})
        .then((result) => {
            console.log(result.messages);
            res.send(result.messages);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/api/allRooms/:user', (req, res) => {
    console.log("Inside /api/allRooms/:user");
    const user = req.params.user;
    userRoom.findOne({ user: user }, { rooms: 1 })
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
});
  


