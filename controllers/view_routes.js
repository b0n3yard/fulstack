const router = require('express').Router()
const path =  require('path')
const {User, post} = require('../models/index.js')
const { isauthenticated, authenticate } = require('./helpers/index.js')
// const session = require('express-session')

router.get('/',async (cro,sro)=>{
    const user = await User.findByPk(cro.session.user_id)
    if(user){
    sro.render('landing',{
        user:{
            id:user.id,
            email:user.email
        }
    })

    }else{
    // sro.send(`<h1>hello there</h1>`)
    // sro.sendFile(path.join(__dirname,'../views/landing.html'))
    sro.render('landing',{name:'michael',
    fruits:['pinaple','bannana','mango'],
    names:[{name:'this'},{name:'another'},{name:'again'}]
   } )
}

})

router.get('/register', (cro,sro)=>{
    sro.render('register')
    // sro.sendFile(path.join(__dirname,'../views/register.html'))
// sro.send('hello')
})
router.get('/login',(cro,sro)=>{
    sro.render('login')
})
router.get('/post',isauthenticated,authenticate,(cro,sro)=>{
    console.log('hi')
    sro.render('post',{
        user:cro.user,
        Title:'make a post'
    })
    cro.session.errors = []
    // sro.send('hi')
})
router.get('/profile', isauthenticated,authenticate,async (cro,sro)=>{
    sro.render('profile',{
        user:cro.user,
        Title:'User Profile - ' + cro.email
    })
})
module.exports =router