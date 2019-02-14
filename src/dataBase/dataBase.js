const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vuedemo',
})

// exports.handle = (sql, callback) => {
//   connection.query(sql, (err, results) => {
//     if (err) {
//       throw err
//       return
//     }
//     callback(results)
//   })
// }

exports.handle = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}
