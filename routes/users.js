const express = require('express')
const {Users} = require('../schemas/users')
const mongoose = require('mongoose')
const router = express.Router();


//get, query, and limit
router.get('/', (req, res) => {
  const queryParams = Object.keys(req.query)
  let limit
  let sortBy = {}
  req.query.limit ? limit = req.query.limit : limit = 0
  if (req.query.sortBy) {
    let arr = req.query.sortBy.split(":")
    sortBy[arr[0]] = arr[1]
  }
  let queryObj = {}
  for (let param of queryParams) {
    if (param != "limit" && param != "sortBy") {
      queryObj[param] = req.query[param]
    }
  }
  console.log(req.query, queryObj, limit)
  console.log(typeof limit, sortBy)

  async function getAllUsers() {
    try {
      let allUsers = await Users
        .find(queryObj)
        .limit(parseInt(limit))
        .sort(sortBy)
      console.log(allUsers)
      res.json(allUsers)
    } catch (err) {
      res.send(err.message)
    }
  }
  getAllUsers()
})


//a json option
router.post('/.json', (req, res) => {
  async function newUser() {
    const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      favoriteFood: req.body.favoriteFood,
    })
    try {
      const result = await user.save()
      console.log(result)
      console.log(req.body)
      res.send(`User Saved:${result}`)
    } catch (err) {
      res.send(err.message)
    }
  }
  newUser()

})


//a urlencoded option
router.post('/:firstName/:lastName/:age/:favoriteFood', (req, res) => {
  async function newUser() {
    const user = new Users({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      age: req.params.age,
      favoriteFood: req.params.favoriteFood,
    })
    const result = await user.save()
    console.log(result)
    console.log(req.params)
  }
  newUser()
  res.send("User Saved!")
})



//updating the file
router.put('/:id', (req, res) => {
  async function findUser() {
    let ID = req.params.id
    console.log(ID)
    try {
      ID = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      console.log(err)
      return res.send("Invalid ID.")
    }
    const user = await Users.findOne({ _id: ID })
    console.log(user)
    if (!user) return res.send("User not found.")

    if (req.body.firstName) user.firstName = req.body.firstName
    if (req.body.lastName) user.lastName = req.body.lastName
    if (req.body.age) user.age = req.body.age
    if (req.body.favoriteFood) user.favoriteFood = req.body.favoriteFood

    console.log(user)
    await user.save()
    res.send(`User Updated: ${user}`)
  }
  findUser()
})



router.get('/:id', (req, res) => {
  async function findUser() {
    let ID = req.params.id
    console.log(ID)
    try {
      ID = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      console.log(err)
      return res.send("Invalid ID.")
    }
    const user = await Users.find({ _id: ID })
    console.log(user)
    if (!user) return res.send("User not found.")

    res.json(user)
  }
  findUser()
})



router.delete('/:id', (req, res) => {
  async function deleteUser() {
    let ID = req.params.id
    console.log(ID)
    try {
      ID = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
      console.log(err)
      return res.send("Invalid ID.")
    }
    const user = await Users.findOne({ _id: ID })
    console.log(user)
    if (!user) return res.send("User not found.")
    await Users.deleteOne({ _id: ID })
    res.send("User deleted.")
  }
  deleteUser()
})


module.exports = router