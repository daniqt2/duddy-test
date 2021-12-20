const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Endpoints
const clientsEp = require('./api/clients.js');
const trainersEp = require('./api/trainers');

app.use('/api/clients', clientsEp);
app.use('/api/trainers', trainersEp);

//  Production settindgs so that the front can be rendered
if (process.env.NODE_ENV === 'production') {
    // Use the public folder content
    app.use(express.static(__dirname + '/public'));
    //  So that front end routes get rendered
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} :)`));
