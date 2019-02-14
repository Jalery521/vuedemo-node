const path = require('path')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))

exports.getComments = async (req, res) => {
  const { pageIndex, pageSize, commentsState } = req.query // 传过来的页码数和页容量
  const startNum = (pageIndex - 1) * pageSize // 计算查询数据的起始id
  let sql1 = ''
  let sql2 = ''
  if (commentsState) {
    sql1 = `select c.id,c.author,c.content,p.title,c.created,c.status from comments c join posts p on c.post_id=p.id where c.status='${commentsState}' order by id desc limit ${startNum},${pageSize}`
    sql2 = `select * from comments c join posts p on c.post_id=p.id where c.status='${commentsState}'`
  } else {
    sql1 = `select c.id,c.author,c.content,p.title,c.created,c.status from comments c join posts p on c.post_id=p.id where c.status!='trashed' order by id desc limit ${startNum},${pageSize}`
    sql2 = `select * from comments c join posts p on c.post_id=p.id where c.status!='trashed'`
  }
  const result1 = await dataBase.handle(sql1)
  const result2 = await dataBase.handle(sql2)
  // 默认查询数据以id倒序查询,按日期从近到远
  if (result1.length && result2.length) {
    res.json({ message: '获取数据成功', state: 1, data: result1, totalCount: result2.length })
  } else if (!result1.length && !result2.length) {
    res.json({ message: '暂无相关数据', state: 0 })
  } else if (!result1.length && result2.length) {
    res.json({ message: '无更多数据了', state: 0 })
  }
}

// 更改评论状态
exports.updateComment = async (req, res) => {
  const { id, state } = req.body
  let sql = ''
  if (state !== 'delete') {
    sql = `update comments set status='${state}' where id=${id}`
  } else {
    sql = `delete from comments where id=${id}`
  }
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '操作成功', state: 1 })
  } else {
    res.json({ message: '操作失败', state: 0 })
  }
}

// 批量删除文章
exports.updateSome = async (req, res) => {
  const { ids, state } = req.body
  let sql = ''
  if (state === 'delete') {
    sql = `delete from comments where id in (${ids})`
  } else {
    sql = `update comments set status='${state}' where id in (${ids})`
  }
  const result = await dataBase.handle(sql)
  if (result.affectedRows) {
    res.json({ message: '操作成功', state: 1 })
  } else {
    res.json({ message: '操作失败', state: 0 })
  }
}
