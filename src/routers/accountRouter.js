const path = require('path')
const express = require('express')
const accountRouter = express.Router()
const accountControl = require(path.join(__dirname, '../controls/accountControl.js'))

accountRouter.get('/getUserIcon', accountControl.getUserIcon)
accountRouter.post('/checkUser', accountControl.checkUser)
module.exports = accountRouter
