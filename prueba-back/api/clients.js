const express = require('express')
const router = express.Router();


const CLIENTS = require('./data/clients.json')
router.get('/', (request,res)=> {
    res.send(CLIENTS);
});



module.exports = router;