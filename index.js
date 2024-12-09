const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {handler} = require("./controllers")
const mongoose = require('mongoose');
const { setWebhook } = require('./controllers/lib/axios');
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
const path = require('path');


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  name: { type: String, required: true },
  dateRegistered: { type: String, required: true },
  clickCount: { type: Number, default: 0},
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

app.post("/fetchdata", async (req, res) => {
  const { userId, username, registerdate } = req.body;
  console.log(req.body)
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      const creating_user = {
        _id: userId, // Use userId as the document ID
        name: username,
        dateRegistered: registerdate,
        clickCount: 0,
      };
      user = await User.create(creating_user); // Create and assign the user
    }
    console.log(user)
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to connect to database. /Database is down.." });
  }
});

app.post("/savedata", async (req, res) => {
  const { userId, clickCount } = req.body;

  try {
    const filter = { _id: userId }; // Filter by userId
    const update = {
      $set: { clickCount: clickCount }, // Update the clickCount field
    };

    const result = await User.updateOne(filter, update);
    console.log(user)
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Cannot fetch userId from database for some reason. Contact admin." });
    }
    res.status(200).json({ success: true, message: "User data updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to connect to database. /Database is down.." });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
