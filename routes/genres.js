const express = require('express')
const {Genres} = require('../schemas/genres')
const mongoose = require('mongoose')
const router = express.Router();

router.get('/',async (req,res)=>{
  try{
    const allGenres = await Genres.find({})
    res.render('Genres', {
      title: "Genres",
      genress:allGenres,
    })
  }catch(err){
    res.status(500).send(err.message)
  }
  
})

module.exports = router


