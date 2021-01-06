const express = require('express')
const {Logins} = require('../schemas/logins')
const mongoose = require('mongoose')
const router = express.Router();

router.post('/', async (req, res) => {
  let hash
  try {
    hash = await bcrypt.hash(req.body.password, 10)
  } catch (err) {
    res.send(err.message)
  }
  const newlogin = new Logins({
    username: req.body.username,
    password: hash
  })
  try {
    const checkUser = await Logins.findOne({ username: req.body.username })
    if (checkUser != null) throw new Error("User already exists.")
    const result = await newlogin.save()
    res.send(`Login saved:${result}`)
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/', async (req, res) => {
  let queryObj
  req.query.username ? queryObj = { username: req.query.username } : queryObj = {}
  try {
    const login = await Logins.findOne(queryObj)
    let match = false
    if (req.query.password) {
      match = await bcrypt.compare(req.query.password, login.password)
    }
    res.send(`${match},${login}`)
  } catch (err) {
    res.send(err.message)
  }
})

router.delete('/', async (req, res) => {
  try {
    const result = await Logins.deleteOne({
      username: req.body.username,
    })
    if (result.deletedCount == 0) throw new Error(`Cannot delete: User ${req.body.username} not found.`)
    res.send(`User '${req.body.username}' deleted.`)
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = router