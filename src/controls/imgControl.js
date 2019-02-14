// const path = require('path')
// const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))
// const fs = require('fs')

// exports.findImg = async (req, res) => {
//   const { imgname } = req.params
//   console.log(imgname)
//   const sql = `select * from imgs where imgname=${imgname}`
//   const result = await dataBase.handle(sql)
//   console.log(result)
//   if (result.length) {
//     const imgPath = result[0].path
//     const data = fs.readFileSync(imgPath, 'binary')
//     res.write(data, 'binary')
//   }
// }
