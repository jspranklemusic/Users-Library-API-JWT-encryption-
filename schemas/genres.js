const mongoose = require('mongoose')

const Genres = new mongoose.model('Genres',mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}))

exports.Genres = Genres