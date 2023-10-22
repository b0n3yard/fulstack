const router = require('express').Router()
const path =  require('path')

const user = require('../models/user')
// router.use(express.json())
router.post('/register',async (cro,sro)=>{
    try{
    const data =  await user.create(cro.body)
    // console.table(data)
    sro.redirect('/')


} catch(err){
    sro.redirect('/register')
    console.log(err)
    sro.status(500).json({message:`error`})

    }
// console.log(hi)
    
})
router.post('/login',async (cro,sro)=>{
    const User = await user.findOne({
        where:{
            email: cro.body.email
        }
    })
    // console.log(user.id)
    // console.log(User.id)
    // console.log(User.email)
    // console.log(User.password)
    if(!user){
        cro.session.errors = ['no user found with that email']
        return redirect('/login')
    }
    const pass_valid = await User.validatePass(cro.body.password)
    if(pass_valid){
        cro.session.errors = ['password invalid']
    }
    cro.session.user_id = User.id;
    sro.redirect('/')
})
router.get('/logout', (cro,sro)=>{
    cro.session.destroy()
    sro.redirect('/')
})
module.exports =router