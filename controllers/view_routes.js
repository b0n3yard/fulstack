const router = require('express').Router()
const path =  require('path')

router.get('/',(cro,sro)=>{
    // sro.send(`<h1>hello there</h1>`)
    // sro.sendFile(path.join(__dirname,'../views/landing.html'))
    sro.render('landing',{name:'michael',
    fruits:['pinaple','bannana','mango'],
    names:[{name:'this'},{name:'another'},{name:'again'}]
   } )
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