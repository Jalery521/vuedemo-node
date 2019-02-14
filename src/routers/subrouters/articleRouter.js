const express = require('express')
const articleRouter = express.Router()
const path = require('path')
const articleControl = require(path.join(__dirname, '../../controls/articleControl.js'))
articleRouter.get('/getPosts', articleControl.getPosts)
articleRouter.post('/updatePost', articleControl.updatePost)
articleRouter.post('/updateSome', articleControl.updateSome)
articleRouter.post('/addPost', articleControl.addPost)
articleRouter.get('/getCategories', articleControl.getCategories)
articleRouter.post('/updateCategory', articleControl.updateCategory)
articleRouter.post('/addCategory', articleControl.addCategory)
articleRouter.post('/delCategory', articleControl.delCategory)

module.exports = articleRouter
