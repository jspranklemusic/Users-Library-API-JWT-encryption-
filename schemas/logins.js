const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 12
  },
  password: String,
})
const Logins = mongoose.model('Logins', loginSchema)

exports.Logins = Logins