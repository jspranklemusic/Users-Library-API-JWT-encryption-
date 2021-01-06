const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  age: Number,
  favoriteFood: String,
  dateCreated: { type: Date, default: Date.now },
})
const Users = mongoose.model('Users', userSchema)

exports.Users = Users