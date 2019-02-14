const express = require('express')
const usersRouter = express.Router()
const path = require('path')
const usersControl = require(path.join(__dirname, '../../controls/usersControl.js'))
usersRouter.get('/getUsers', usersControl.getUsers)
usersRouter.post('/updateUser', usersControl.updateUser)
usersRouter.post('/addUser', usersControl.addUser)
module.exports = usersRouter
