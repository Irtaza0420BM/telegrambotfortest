const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodb = require("./databaseConnection/mongodb")
const app = express();
const cors = require("cors")
const router= require("./routes/router")



app.use(cors()); // Allow all origins
app.use(express.json())
app.use(bodyParser.json());
app.use( router)

mongodb

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
