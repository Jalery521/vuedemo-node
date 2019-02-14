const path = require('path')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))
const jwt = require('jsonwebtoken')
const secretKey = 'jalery521'
exports.getUserIcon = async (req, res) => {
  const username = req.query.username
  const sql = `select * from users where username='${username}'`
  const result = await dataBase.handle(sql)
  switchState(result, res)
}

const switchState = (docs, res) => {
  if (docs.length) {
    switch (docs[0].status) {
      case 'activated':
        res.json({ message: '获取成功', state: 1, data: docs[0].avatar })
        break
      case 'unactivated':
        res.json({ message: '此账户尚未启用,请联系管理员', state: 2 })
        break
      case 'forbidden':
        res.json({ message: '此账户已被禁用,请联系管理员', state: 4 })
        break
      case 'trashed':
        res.json({ message: '此账户已被弃用,请重新注册', state: 5 })
    }
  } else {
    res.json({ message: '用户名不存在', state: 0 })
  }
}

exports.checkUser = async (req, res) => {
  const { username, password } = req.body
  const sql = `select * from users where username='${username}' and password='${password}' and status='activated' limit 1`
  const result = await dataBase.handle(sql)
  if (result.length) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: 60 * 60 })
    res.json({ message: '登录成功', state: 1, token, data: result[0] })
  } else {
    res.json({ message: '账户与密码不匹配', state: 0 })
  }
}
