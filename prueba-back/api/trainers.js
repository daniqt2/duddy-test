const express = require('express')
const router = express.Router();


const TRAINERS = require('./data/trainers.json')
router.get('/', (request,res)=> {
    res.send(TRAINERS);
});



module.exports = router;