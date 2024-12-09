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


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const userSchema = new mongoose.Schema({
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

app.post("/fetchdata", async(req,res) =>{ 
 const { userId , username, registerdate} = req.body
 try{
    const user = await User.findById(userId)
    if(!user)
    {
      const creating_user = {
        username: username,
        dateRegistered: registerdate,
        clickCount: 0
      }
      const user = await User.create(creating_user)
    }    
  }
  catch(error)
  {
    res.status(404).json({success: false, message: "Unable to connect to database. /Database is down.."})
  }
})


app.post("/savedata", async(req,res)=> {
  const {userId, clickCount} = req.body
  try{
    const filter = { _id: userId }; // The document to update
    const update = {
      $set: {
        field1: clickCount, // Fields to update
      },
    };
    const user = await User.updateOne(filter, update)
    if(!user)
    {
      res.status(404).json({success: false, message: "Cannot fetch userId from database for some reason. Contact admin. "})
      }
     
    }    
  catch(error)
  {
    res.send(404).json({success: false, message: "Unable to connect to database. /Database is down.."})
  }
  
})
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
