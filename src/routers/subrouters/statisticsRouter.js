const express = require('express')
const path = require('path')
const statisticsRouter = express.Router()
const statisticsControl = require(path.join(__dirname, '../../controls/statisticsControl.js'))
statisticsRouter.get('/getStatistics', statisticsControl.getStatistics)
statisticsRouter.get('/getChart', statisticsControl.getChart)
module.exports = statisticsRouter
