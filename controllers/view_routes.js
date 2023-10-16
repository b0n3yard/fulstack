const router = require('express').Router()
const path =  require('path')

router.get('/',(cro,sro)=>{
    // sro.send(`<h1>hello there</h1>`)
    sro.sendFile(path.join(__dirname,'../views/landing.html'))

})

router.get('/register', (cro,sro)=>{
    sro.sendFile(path.join(__dirname,'../views/register.html'))
// sro.send('hello')
})
module.exports =router