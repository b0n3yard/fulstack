const User = require('./user')
const post =require('./post')

User.hasMany(post,{ as:'posts', foreignKey:'author_id'})
post.belongsTo(User,{as: 'author', foreignKey:'author_id'})

module.exports = { User,post}