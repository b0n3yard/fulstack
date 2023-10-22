const router = require('express').Router()
const path =  require('path')
const {User, post} = require('../models')
// user = require('../models/user.js')
// router.use(express.json())
router.post('/register',async (cro,sro)=>{
    try{
    const data =  await User.create(cro.body)
    cro.session.user_id = data.id
    // console.table(data)
    sro.redirect('/')


} catch(err){
    cro.session.errors = err.errors.map(errObj => errObj.message);
    sro.redirect('/register')
   

    }
// console.log(hi)
    
})
router.post('/login',async (cro,sro)=>{
    const user = await User.findOne({
        where:{
            email: cro.body.email
        },
        raw:true
    })
    console.log(user)
    if(!user){
        cro.session.errors = ['no user found with this email']
        return res.redirect('/login')
    }
    const pass_is_valid = await user.validatePass(cro.body.password)

    if(!pass_is_valid){
        // cro.session.errors = ['password is incorrect']
        sro.redirect('/login')
    }

    cro.session.user_id = user.id
    sro.redirect('/')
})
router.get('/logout', (cro,sro)=>{
    cro.session.destroy()
    sro.redirect('/')
})
module.exports =router