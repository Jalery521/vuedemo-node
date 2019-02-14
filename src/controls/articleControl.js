const path = require('path')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))
const multiparty = require('multiparty')

// 查询文章数据
exports.getPosts = async (req, res) => {
  //获取所有文章
  const { pageIndex, pageSize, postsState } = req.query // 传过来的页码数和页容量
  const startNum = (pageIndex - 1) * pageSize // 计算查询数据的起始id
  let sql1 = ''
  let sql2 = ''
  if (postsState) {
    sql1 = `select p.id,p.title,u.username,c.name,p.created,p.status from posts p join users u on p.user_id=u.id join categories c on p.category_id=c.id where p.status='${postsState}' order by id desc limit ${startNum},${pageSize}`
    sql2 = `select * from posts p join users u on p.user_id=u.id join categories c on p.category_id=c.id where p.status='${postsState}'`
  } else {
    sql1 = `select p.id,p.title,u.username,c.name,p.created,p.status from posts p join users u on p.user_id=u.id join categories c on p.category_id=c.id where p.status!='trashed' order by id desc limit ${startNum},${pageSize}`
    sql2 = `select * from posts p join users u on p.user_id=u.id join categories c on p.category_id=c.id where p.status!='trashed'`
  }
  const result1 = await dataBase.handle(sql1)
  const result2 = await dataBase.handle(sql2)
  // 默认查询数据以id倒序查询,按日期从近到远
  if (result1.length && result2.length) {
    res.json({ message: '获取数据成功', state: 1, data: result1, totalCount: result2.length })
  } else {
    res.json({ message: '获取数据出错', state: 0 })
  }
}

// 更改文章状态
exports.updatePost = async (req, res) => {
  const { id, state } = req.body
  let sql = ''
  if (state !== 'delete') {
    sql = `update posts set status='${state}' where id=${id}`
  } else {
    sql = `delete from posts where id=${id}`
  }
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '操作成功', state: 1 })
  } else {
    res.json({ message: '操作失败', state: 0 })
  }
}

// 批量修改文章
exports.updateSome = async (req, res) => {
  const { ids, state } = req.body
  let sql = ''
  if (state === 'delete') {
    sql = `delete from posts where id in ${ids}`
  } else {
    sql = `update posts set status='${state}' where id in (${ids})`
  }
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '操作成功', state: 1 })
  } else {
    res.json({ message: '操作失败', state: 0 })
  }
}

// 查询文章分类
exports.getCategories = async (req, res) => {
  const sql = 'select * from categories'
  const result = await dataBase.handle(sql)
  res.json({ message: '获取成功', state: 1, data: result })
}

// 新增文章
exports.addPost = (req, res) => {
  const form = new multiparty.Form({
    uploadDir: path.join(__dirname, '../static/imgs'),
  })
  form.parse(req, (err, fields, files) => {
    const title = fields.title[0]
    const content = fields.content[0]
    const slug = fields.slug[0]
    const category_id = fields.category_id[0]
    const status = fields.status[0]
    const user_id = feilds.user_id[0]
    console.log(files.img[0])
    // const feature = files.img ? files.img[0].path : ''
    // const sql = `insert into posts (title,content,slug,category_id,created,status,feature,user_id) values('${title}','${content}','${slug}','${category_id}','${created}','${status}','${feature}',${user_id})`
    // dataBase.handle(sql).then(result => {
    //   if (result.affectedRows) {
    //     res.json({ message: '新增文章成功', state: 1 })
    //   } else {
    //     res.json({ message: '新增文章失败', state: 0 })
    //   }
    // })
  })
}

// 更改分类信息
exports.updateCategory = async (req, res) => {
  const { id, name, slug } = req.body
  const sql = `update categories set name='${name}',slug='${slug}' where id=${id}`
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '修改成功', state: 1 })
  } else {
    res.json({ message: '修改失败', state: 0 })
  }
}

// 新增分类信息
exports.addCategory = async (req, res) => {
  const { name, slug } = req.body
  const sql = `insert into categories (name,slug) values ('${name}','${slug}')`
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '新增成功', state: 1 })
  } else {
    res.json({ message: '新增失败', state: 0 })
  }
}

// 删除分类信息
exports.delCategory = async (req, res) => {
  const { id } = req.body
  const sql = `delete from categories where id=${id}`
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '删除成功', state: 1 })
  } else {
    res.json({ message: '删除失败', state: 0 })
  }
}
