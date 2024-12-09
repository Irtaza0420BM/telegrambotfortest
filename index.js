const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {handler} = require("./controllers")
const mongoose = require('mongoose');
const { setWebhook } = require('./controllers/lib/axios');
const app = express();
app.use(express.json())
app.use(bodyParser.json());
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  dateRegistered: { type: String, required: true },
  data: { type: Number, default: 0},
  stats: {type: String, default: 'created'},
});

const User = mongoose.model('User', userSchema);

app.get("/setwebhook" , setWebhook)

app.post('/', async (req, res) => {
    const update = req.body;
    console.log(update)
    const response = await handler(update)
    res.send("ok")

});

app.get("/" , async(req, res)=> {
  console.log(req.body)
  res.send("ok")
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
