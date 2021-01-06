const mongoose = require('mongoose')

const Books = new mongoose.model('Books',mongoose.Schema({
  title:{
    type:String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  author:{
    type:String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  genre:{
    type:String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  length:{
    type:Number,
    required:this.published
  },
  published:{
    type:Boolean,
    required:true
  },
}))

exports.Books = Books