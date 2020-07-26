const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname + '/../public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

app.get('/test', function (req, res) {
    res.send('Test');
});


app.get('/api/imageData', async function (req, res) {
    try {
        const result = await axios.get('http://backend:3000/api/imageData?sort=alphabetically&count=3&order=desc');
        res.send(result.data);
    } catch (e) {
        res.send(e);
    }
});

app.listen(8080, function () {
    console.log('Listening on Port 8080');
});