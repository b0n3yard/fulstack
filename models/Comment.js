const {Model, DataTypes} = require('sequelize')
const db = require('../db/connections')

class Comment extends Model{}

Comment.init({

    text:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    modelName:'comments',
    freezeTableName: true,
    sequelize:db
})

module.exports = Comment