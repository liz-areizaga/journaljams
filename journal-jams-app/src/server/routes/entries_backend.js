const {Router} = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {
            title: 'Good days',
            entry: 'Today was a good day'
        },
        {
            title: 'Bad days',
            entry: 'Today was a bad day'
        }
    ])
});