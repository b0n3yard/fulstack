const {Model, DataTypes} = require('sequelize')
const db = require('../db/connections')
const { hash, compare } = require('bcrypt');

class User extends Model{}

User.init({
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
    timestamps:false,
    hooks:{
        async beforeCreate(user){
            user.password = await hash(user.password, 10)
            return user
        }
    }
})
User.prototype.validatePass = async function(form_password){
        const is_valid = await compare(form_password, this.password)
        return is_valid
    }
module.exports= User;