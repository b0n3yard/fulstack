const router = require('express').Router()
const path =  require('path')
const {User, post,Comment} = require('../models/index.js')
const { isauthenticated, authenticate } = require('./helpers/index.js')
// const session = require('express-session')

router.get('/',async (cro,sro)=>{
    const user = await User.findByPk(cro.session.user_id)
    if(user){
        const posts = await post.findAll({
            include: {model:User,
            as:'author'},
            // where:{
            //     author_id: cro.session.user_id
            // },
            raw:false
        })
        const plain =posts.map(c=> c.get({plain:true}))
        // console.log(posts)
    sro.render('landing',{
        posts:plain,
        user:{
            id:user.id,
            email:user.email
        }
    })

    }else{
    // sro.send(`<h1>hello there</h1>`)
    // sro.sendFile(path.join(__dirname,'../views/landing.html'))
    const posts = await post.findAll({
        include:{model:User, 
        as:'author'},raw:false})
    // console.log(posts)
    sro.render('landing',{post: posts.map(c=> c.get({plain:true}))
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
router.get('/edit_post/:id',isauthenticated,authenticate,async (cro,sro)=>{
    const posts = await post.findByPk(cro.params.id)
    console.log(cro.user)

    sro.render('edit_post',{
        user:cro.user,
        post: posts.get({plain:true}),
        Title:'edit post' + posts.id
    })
})
router.get('/viewpost/:id',async (cro,sro)=>{
    const posts = await post.findByPk(cro.params.id, { include: [{model:User,
        as:'author'},{model:Comment, include: [User]}]})
        const plain = posts.get({plain:true})
        console.log('session', cro.session.user_id)
        console.log('user id',plain.author_id)
        let is_author = false
        if(plain.author_id && cro.session.user_id && plain.author_id === cro.session.user_id ){
            is_author = true
        }
        console.log(cro.user)
    sro.render('viewpost',{
        user:cro.user,
        post: plain,
        Title:'post' + posts.id,
        comment: posts.postId,
        session: is_author
    })

})
module.exports =router