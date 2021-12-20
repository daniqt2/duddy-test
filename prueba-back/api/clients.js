const express = require('express');
const router = express.Router();

// return dummy data for the trainers
const CLIENTS = require('./data/clients.json');
router.get('/', (request, res) => {
    res.send(CLIENTS);
});

module.exports = router;
