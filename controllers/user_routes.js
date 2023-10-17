const router = require('express').Router()
const path =  require('path')

user = require('../models/user.js')
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
router.post('/login',(cro,sro)=>{
    
})
module.exports =router