const router = require('express').Router()
const path =  require('path')
const {User, post,Comment} = require('../models/index.js')
const {isauthenticated} = require('./helpers')
const { param } = require('./view_routes.js')

router.post('/post',isauthenticated, async(cro,sro)=>{
    try{
        const posts = await post.create(cro.body)
        const user = await User.findByPk(cro.session.user_id)
        await user.addPost(posts)
        sro.redirect('/')
    }catch(error){
        console.log(error)
        if(error.errors){
            cro.session.errors = error.errors.map(errobj => errobj.message)
        }
        sro.redirect('/post')
    }
})

router.post('/post/:id',async(cro,sro)=>{
    const id = cro.params.id
    await post.update(cro.body,{
        where:{
            id: cro.params.id
        }
    })
    sro.redirect('/profile')
})
router.post('/post/delete/:id', async (cro,sro)=>{
   await Comment.destroy({
        where: {
            postId:cro.params.id
        }
    }) 
    await post.destroy({
        where:{
            id:cro.params.id
        }
    })
    
    sro.redirect('/profile')
})
router.post('/createcomment',(cro,sro)=>{
    // console.log(cro.body)
    const test = Number(cro.body.post_id)
    // console.log('commenter',cro.session.user_id)
    // console.log('post_id', test)
    const comments = Comment.create({
        text: cro.body.comment,
        userId: cro.session.user_id,
        postId: test
    })
    sro.redirect('/')
})
module.exports = router