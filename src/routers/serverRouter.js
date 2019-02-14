const express = require('express')
const serverRouter = express.Router()
const path = require('path')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))
const jwt = require('jsonwebtoken')
const secretKey = 'jalery521'
//对请求进行验证
serverRouter.all('*', (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization
    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
        res.json({ message: '登录已过期', state: 401 })
        return
      }
      const { username } = result
      const sql = `select * from users where username='${username}'`
      dataBase.handle(sql).then(result => {
        if (result.length) {
          next()
        } else {
          res.json({ message: '用户不存在', state: 401 })
        }
      })
    })
  } else {
    res.json({ message: '用户未登录', state: 401 })
  }
})
const articleRouter = require(path.join(__dirname, './subrouters/articleRouter.js'))
const statisticsRouter = require(path.join(__dirname, './subrouters/statisticsRouter.js'))
const commentsRouter = require(path.join(__dirname, './subrouters/commentsRouter.js'))
const usersRouter = require(path.join(__dirname, './subrouters/usersRouter.js'))
serverRouter.use('/statistics', statisticsRouter)
serverRouter.use('/article', articleRouter)
serverRouter.use('/comments', commentsRouter)
serverRouter.use('/users', usersRouter)
module.exports = serverRouter
