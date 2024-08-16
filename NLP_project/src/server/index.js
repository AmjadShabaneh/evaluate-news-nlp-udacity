const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const getAPI = require('./getAPI');

// Load environment variables from .env file
dotenv.config();

// Access API key from environment variables
const api_key = process.env.API_KEY;
if (!api_key) {
    console.error('API_KEY is not defined in the .env file');
    process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname); 
// Logs the directory name of the current module



// GET Route
app.get('/', function (req, res) {
    res.send({ data: "fk" });
});

// POST Route
app.post('/post', async function (req, res) {
    const input = req.body.input;
    
    try {
        // Await the getData function before sending the response
        const getDataResponse = await getAPI.getData(input, api_key);
        res.send({ analysis: getDataResponse});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ error: 'Failed to analyze data' });
    }
});

// Listen on port 8000
app.listen(8000, function () {
    console.log('Example app listening on port 8000! API Key:', api_key);
});
