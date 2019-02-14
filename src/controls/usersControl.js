const path = require('path')
const fs = require('fs')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))
const multiparty = require('multiparty')
const form = new multiparty.Form({
  uploadDir: path.join(__dirname, '../static/imgs'),
})
exports.getUsers = async (req, res) => {
  const sql = `select * from users`
  const result = await dataBase.handle(sql)
  res.json({ message: '获取数据成功', state: 1, data: result })
}

exports.updateUser = (req, res) => {
  const form = new multiparty.Form({
    uploadDir: path.join(__dirname, '../static/imgs'),
  })
  form.parse(req, (err, fields, files) => {
    const id = fields.id[0]
    const username = fields.username[0]
    const password = fields.password[0]
    const nickname = fields.nickname[0]
    const slug = fields.slug[0]
    const bio = fields.bio[0]
    let avatar = ''
    // let sql1
    if (files.avatar) {
      const oldPath = files.avatar[0].path
      const fsname = files.avatar[0].originalFilename
      const newPath = path.join(__dirname, '../static/imgs', `${fsname}`)
      // console.log(newPath)
      fs.renameSync(oldPath, newPath)
      // avatar = `http://127.0.0.1:3000/img/${fsname}`
      // const _path = `C:\Users\Jalery\Desktop\vue_demo1\vuenode\src\static\imgs\${fsname}`
      // console.log(_path)
      // sql1 = `insert into imgs (imgname,path) values ('${fsname}','${_path}')`
    }
    const sql = `update users set username='${username}',password='${password}',nickname='${nickname}',slug='${slug}',bio='${bio}',avatar='${avatar}' where id=${id}`
    // if (!sql1) {
    dataBase.handle(sql).then(result => {
      if (result.affectedRows) {
        res.json({ message: '修改成功', state: 1 })
      } else {
        res.json({ message: '修改失败', state: 0 })
      }
    })
    // } else {
    //   dataBase.handle(sql1).then(result => {
    //     if (result.affectedRows) {
    //       dataBase.handle(sql2).then(result => {
    //         if (result.affectedRows) {
    //           res.json({ message: '修改成功', state: 1 })
    //         } else {
    //           res.json({ message: '修改失败', state: 0 })
    //         }
    //       })
    //     } else {
    //       res.json({ message: '修改失败', state: 0 })
    //     }
    //   })
    // }
  })
}

exports.addUser = (req, res) => {
  const form = new multiparty.Form({
    uploadDir: path.join(__dirname, '../static/imgs'),
  })
  form.parse(req, (err, fields, files) => {
    const username = fields.username[0]
    const password = fields.password[0]
    const nickname = fields.nickname[0]
    const slug = fields.slug[0]
    const bio = fields.bio[0]
    let avatar = ''
    // let sql1
    if (files.avatar) {
      const oldPath = files.avatar[0].path
      const fsname = files.avatar[0].originalFilename
      const newPath = path.join(__dirname, '../static/imgs', `${fsname}`)
      fs.renameSync(oldPath, newPath)
      // avatar = `http://127.0.0.1:3000/img/${fsname}`
      // const _path = `C:\Users\Jalery\Desktop\vue_demo1\vuenode\src\static\imgs\${fsname}`
      // console.log(_path)
      // sql1 = `insert into imgs (imgname,path) values ('${fsname}','${_path}')`
    }
    const sql = `insert into users (username,password,nickname,slug,bio,avatar,isroot,status) value('${username}','${password}','${nickname}','${slug}','${bio}','${avatar}','no','activated')`
    // if (!sql1) {
    dataBase.handle(sql).then(result => {
      if (result.affectedRows) {
        res.json({ message: '新增成功', state: 1 })
      } else {
        res.json({ message: '新增失败', state: 0 })
      }
    })
    // } else {
    // dataBase.handle(sql1).then(result => {
    //   console.log(result)
    //   if (result.affectedRows) {
    //     dataBase.handle(sql2).then(result => {
    //       if (result.affectedRows) {
    //         res.json({ message: '新增成功', state: 1 })
    //       } else {
    //         res.json({ message: '新增失败', state: 0 })
    //       }
    //     })
    //   } else {
    //     res.json({ message: '新增失败', state: 0 })
    //   }
    // })
    // }
  })
}
