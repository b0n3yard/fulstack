const router = require('express').Router()
const path =  require('path')
const {User, post} = require('../models/index.js')
const {isauthenticated} = require('./helpers')
const { param } = require('./view_routes.js')

router.post('/post',isauthenticated, async(cro,sro)=>{
    try{
        const posts = await post.create(cro.body)
        const user = await User.findByPk(cro.session.user_id)
        await user.addpost(posts)
        sro.redirect('/')
    }catch(error){
        console.log(error)
        if(error.errors){
            cro.session.errors = error.errors.map(errobj => errobj.message)
        }
        sro.redirect('/post')
    }
})

router.put('/post/:id',async(cro,sro)=>{
    const id = cro.params.id
    await post.update(cro.body,{
        where:{
            id: cro.params.id
        }
    })
    sro.redirect('/profile')
})
router.delete('/post/:id', async (cro,sro)=>{
    await post.destroy({
        where:{
            id:cro.params.id
        }
    })
    sro.redirect('/profile')
})
module.exports = router