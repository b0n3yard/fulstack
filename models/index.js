const User = require('./user')
const post =require('./post')
const Comment = require('./Comment')
const Post = require('./post')
User.hasMany(post,{ as:'posts', foreignKey:'author_id'})
post.belongsTo(User,{as: 'author', foreignKey:'author_id'})
User.hasMany(Comment)
Comment.belongsTo(User)
post.hasMany(Comment)
Comment.belongsTo(post)

module.exports = { User,post,Comment}