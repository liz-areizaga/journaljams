const express = require('express');
const mongoose = require('mongoose');
// const Entry = require('./Models/Entries'); 
const path = require('path');

// //express app
const app = express();

// // Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'journal-jams-app/src')));

app.get('/api/getEntries', (req, res) => {
    console.log("Inside get api get entries");
    var entries_list = [
        {
            title: 'Good days',
            entry: 'Today was a good day'
        },
        {
            title: 'Bad days',
            entry: 'Today was a bad day'
        }
    ]
    res.json(entries_list);
    console.log("Sent list");
});

app.get('*', (res, req) => {
    console.log("ERROR");
})

app.listen(1234);

//connect to mongodb
// const dbURI = 'mongodb+srv://journaljams:journal-jams-cs110@cluster0.s5dxxum.mongodb.net/EntriesDB?retryWrites=true&w=majority'
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));



// app.get('/add-entry', (req, res) => {
//     const myEntry = new Entry({
//         title: "Good days",
//         text: "Today was a good day",
//         mood: "joy"
//     });
//     console.log("In get function")

//     myEntry.save()
//         .then((results) => {
//             // res.send(results)
//             console.log("hi");
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// })