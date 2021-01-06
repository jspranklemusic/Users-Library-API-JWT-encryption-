const express = require('express')
const {Books} = require('../schemas/books')
const mongoose = require('mongoose')
const router = express.Router();

router.get('/',async (req,res)=>{
  try{
    
    const allBooks = await Books.find(req.query)
    res.render('books', {
      title: "Books",
      books:allBooks,
    })
  }catch(err){
    res.status(500).send(err.message)
  }
  
})


router.post('/', async (req,res)=>{
  
  try{
    const b = req.body
    const newbook = await new Books({
      title:b.title,
      author:b.author,
      genre:b.genre,
      length:+b.length,
      published:Boolean(b.published)
    })
    const savedbook = await newbook.save()
    res.send(`Book created: ${savedbook}`)
  }catch(err){
    res.status(400).send(err.message)
  }
})  


/*
  title:String,
  author:String,
  genre:String,
  length:Number,
 */

module.exports = router