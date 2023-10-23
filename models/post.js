const {Model, DataTypes} = require('sequelize')
const db = require('../db/connections')
const dayjs = require('dayjs')

class Post extends Model{}

Post.init({
    text:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
    type:DataTypes.VIRTUAL,
    get(){
        return dayjs(this.createdAt).format('MM/DD/YYYY hh:mm')
    }
    }
},{
    modelName:'posts',
    freezeTableName: true,
    sequelize:db
})
module.exports = Post
