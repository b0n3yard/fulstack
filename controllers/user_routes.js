const router = require('express').Router()
const path =  require('path')

user = require('../models/user.js')
// router.use(express.json())
router.post('/register',async (cro,sro)=>{
    try{
    const data =  await user.create(cro.body)
    console.log(data)
    sro.redirect('/')
//   sro.json({
//     message: 'user added',
//     user: data
// })

} catch(err){
    sro.redirect('/register')
    console.log(err)
    sro.status(500).json({message:`error`})

    }
// console.log(hi)
    
})
module.exports =router