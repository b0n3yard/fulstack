const {Model, DataTypes} = require('sequelize')
const db = require('../db/connections')

class user extends Model{}

user.init({
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
        password:{
            type: DataTypes.STRING,
            allowNull:  false,
            validate:{
                min:6
            }
    },

    
},{
    modelName:'user',
    sequelize: db,
    timestamps:false
})

module.exports= user;