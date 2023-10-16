const router = require('express').Router()
const path =  require('path')

user = require('../models/user.js')
// router.use(express.json())
router.post('/auth/register',(cro,sro)=>{
    const data = cro.body;
    console.log(data)
user.create(data).then(nwusr => { sro.json({
    message: 'user added',
    user: nwusr
})
})
// console.log(hi)
    
})