const express = require('express')
const path = require('path')
const commentsRouter = express.Router()
const commentsControl = require(path.join(__dirname, '../../controls/commentsControl.js'))
commentsRouter.get('/getComments', commentsControl.getComments)
commentsRouter.post('/updateComment', commentsControl.updateComment)
commentsRouter.post('/updateSome', commentsControl.updateSome)
module.exports = commentsRouter
