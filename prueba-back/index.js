const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

const clientsEp = require('./api/clients.js')
const trainersEp = require('./api/trainers')

app.use('/api/clients', clientsEp)
app.use('/api/trainers', trainersEp)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT} :)`))


