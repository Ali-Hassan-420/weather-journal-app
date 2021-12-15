// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000
const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`server is running on port: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(request,respond) {
    respond.send(projectData);
    projectData = {};
}
// Post Route
app.post('/add', addData)

function addData (request,respond) {
    console.log(request.body);
        projectData['date']= request.body.date;
        projectData['temp']= request.body.temp;
        projectData['tempKelvin']= request.body.tempKelvin;
        projectData['feel']= request.body.feel;
        projectData['country']= request.body.country;
        projectData['city']= request.body.city;
    respond.send(projectData);
}