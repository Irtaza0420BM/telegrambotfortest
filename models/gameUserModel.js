const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    name: { type: String, required: true },
    dateRegistered: { type: String, required: true },
    clickCount: { type: Number, default: 0},
  });
  
const User = mongoose.model('User', userSchema);
  
module.exports = {User}