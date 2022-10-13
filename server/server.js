const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;
const mongoURL = "mongodb://127.0.0.1:27017"
const db = "ActiveLA";

const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`${mongoURL}/${db}`, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + 8080);
});