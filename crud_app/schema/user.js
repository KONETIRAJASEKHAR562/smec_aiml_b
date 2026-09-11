const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: String,
  email: String,
  age: Number
});
module.exports = mongoose.model('User', userSchema);



