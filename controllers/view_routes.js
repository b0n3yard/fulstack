const router = require('express').Router()
const path =  require('path')
const user = require('../models/user');

router.get('/',async (cro,sro)=>{
    const User = await user.findByPk(cro.session.user_id)
    console.log(User)
     console.log(cro.session.user_id)
    if (User){
        console.log('hi')
        sro.render('landing',{
            User:{
                id:User.id,
                email: User.email
            }
        })
    }else{
    // sro.send(`<h1>hello there</h1>`)
    // sro.sendFile(path.join(__dirname,'../views/landing.html'))
    sro.render('landing',{name:'michael',
    fruits:['pinaple','bannana','mango'],
    names:[{name:'this'},{name:'another'},{name:'again'}]
   } )}
})

router.get('/register', (cro,sro)=>{
    sro.render('register')
    // sro.sendFile(path.join(__dirname,'../views/register.html'))
// sro.send('hello')
})
router.get('/login',(cro,sro)=>{
    sro.render('login')
})
module.exports =router