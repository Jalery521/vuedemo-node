const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH')
  res.header('Access-Control-Max-Age', 1728000) //预请求缓存20天
  next()
})

const accountRouter = require(path.join(__dirname, './routers/accountRouter.js'))
const serverRouter = require(path.join(__dirname, './routers/serverRouter.js'))
// const imgRouter = require(path.join(__dirname, './routers/imgRouter.js'))
app.use('/account', accountRouter)
app.use('/server', serverRouter)
// app.use('/img', imgRouter)

app.listen(3000, '127.0.0.1', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('app start')
})
