const express = require('express');
const mongoose = require('mongoose');
const Entry = require('../Models/Entries'); 
const User = require('../Models/UserInfo');
const Message = require('../Models/Messages');
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
    // console.log('/api/newMessage');
    const new_message = new Message({
        room: req.body.room,
        message: req.body.message
        // user: req.body.username,
    });

    new_message.save()
        .then((result) => {
            console.log("Sent your message to the DB!");
            console.log(new_message);
        })
        .catch((err) => {
            console.log(err);
        });
})

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

app.get('/api/allMessages', (req, res) => {
    console.log("Inside of /api/allMessages");
    Message.find()
        .then((result) => {
            // console.log(result);
            messageArray = [];
            //go through each message and extract text
            result.forEach((doc)=> {
                messageArray.push(doc.message)
            })
            // console.log(messageArray);
            // res.send(result);
            res.send(messageArray);
        })
        .catch((err) => {
            console.log(err);
        })
});


