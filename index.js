const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const password = "secret"
const saltRounds = 10
const config = require('config')

/*

1. Embed a document in MongoDB
2. Set a JSON Web Token (x-auth-token)
3. Protect some of the routes
4. Authorize some with middleware
5. Set response headers
6. Error handling.

This API includes multiple options for querying, many schemas, and an efficient page structure for workflow.

bcrypt
  .hash(password, saltRounds)//two arguments: your password and the saltRounds. A promise.
  .then(hashedPassword=>{
    console.log("hash", hashedPassword);
    return hashedPassword //returns the password
  })
  .then(hash=>{
    return bcrypt.compare(password,hash)//boolean
  })
  .then(res=>{
    console.log("match",res)
  })

  */

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(cors())

//schemas
const {Users} = require('./schemas/users')

//api routes
const books = require('./routes/books')
const genres = require('./routes/genres')
const logins = require('./routes/logins')
const users = require('./routes/users')

app.use('/api/books',books)
app.use('/api/genres',genres)
app.use('/api/logins',logins)
app.use('/api/users',users)

//static files
app.use(express.static('public'))
//pug
app.set('view engine', 'pug')

//mongoose
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zzbuv.mongodb.net/Project0?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch(err => { 'Could not connect:', err })

//Homepage
app.get('/', (req, res) => {
  async function getAllUsers() {
    let allUsers = await Users.find({})
    console.log(allUsers)
    res.render('index', {
      title: "This is the title.",
      message: "CRUD Operations with Mongoose",
      users: allUsers
    })
  }
  getAllUsers()
})

app.listen(process.env.PORT || PORT, () => {
  `Listning on port:${PORT}`
})


