const path = require('path')
const dataBase = require(path.join(__dirname, '../dataBase/dataBase.js'))

// 获取首页统计数据
exports.getStatistics = async (req, res) => {
  // home页获取统计数据
  const sql1 = `select count(*) from posts where status!='trashed'`
  // 查询文章总条数
  const data = {}
  const result1 = await dataBase.handle(sql1)
  data.postsCount = result1[0]['count(*)'] // 获取文章总数(除去废弃的文章)
  const sql2 = `select count(*) from posts where status='drafted'`
  const result2 = await dataBase.handle(sql2)
  data.draftedPostsCount = result2[0]['count(*)'] // 获取草稿数量
  const sql3 = `select count(*) from categories`
  const result3 = await dataBase.handle(sql3)
  data.categoriesCount = result3[0]['count(*)'] // 获取分类数量
  const sql4 = `select count(*) from comments where status !='trashed'`
  const result4 = await dataBase.handle(sql4)
  data.commentsCount = result4[0]['count(*)'] // 获取评论总数(除去作废的评论)
  const sql5 = `select count(*) from comments where status='held'`
  const result5 = await dataBase.handle(sql5)
  data.heldCommentsCount = result5[0]['count(*)'] // 获取待审核评论数量
  res.json({ message: '获取成功', data, state: 1 }) //把获取的数据返回
}
exports.getChart = async (req, res) => {
  const sql1 = `select * from users`
  const data = { totalChart: {}, usersChart: {}, postsChart: {}, commentsChart: {} }
  const usersArr = await dataBase.handle(sql1) //查询出来的所有用户数据
  const rootAdminArr = usersArr.filter(item => item.isroot === 'yes') //超级用户
  data.totalChart.usersCount = usersArr.length //总用户数
  data.usersChart.rootCount = rootAdminArr.length //超级用户数量
  data.usersChart.adminCount = usersArr.length - rootAdminArr.length //非超级用户数量
  const sql2 = `select * from posts`
  const postsArr = await dataBase.handle(sql2) //所有文章数据
  data.totalChart.postsCount = postsArr.length //总文章数
  const draftedPostsArr = postsArr.filter(item => item.status === 'drafted') //草稿
  const publishedPostsArr = postsArr.filter(item => item.status === 'published') //已发布
  const trashedPostsArr = postsArr.filter(item => item.status === 'trashed') //已废弃
  data.postsChart.draftedCount = draftedPostsArr.length //草稿数
  data.postsChart.pubilshedCount = publishedPostsArr.length //已发布数量
  data.postsChart.trashedCount = trashedPostsArr.length //已废弃数量
  const sql3 = 'select * from categories'
  const categoriesArr = await dataBase.handle(sql3) //全部分类信息
  data.totalChart.categoriesCount = categoriesArr.length //分类数量
  const sql4 = 'select * from comments'
  const commentsArr = await dataBase.handle(sql4) //全部评论信息
  data.totalChart.commentsCount = commentsArr.length //全部评论数量
  const heldCommentsArr = commentsArr.filter(item => item.status === 'held') //待审核
  const approvedCommentsArr = commentsArr.filter(item => item.status === 'approved') //已批准
  const rejectedCommentsArr = commentsArr.filter(item => item.status === 'rejected') //已拒绝
  const trashedCommentsArr = commentsArr.filter(item => item.status === 'trashed') //已废弃
  data.commentsChart.heldCount = heldCommentsArr.length
  data.commentsChart.approvedCount = approvedCommentsArr.length
  data.commentsChart.rejectedCount = rejectedCommentsArr.length
  data.commentsChart.trashedCount = trashedCommentsArr.length
  res.json({ message: '获取成功', data, state: 1 })
}
