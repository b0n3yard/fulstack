const {User, post} = require('../../models/index.js')

function isloggedin(req,res,next){
    if(req.session.user_id){
        return res.redirect('/')
    }
    next()
}
function autologout(req,res,next){
    
    // if(!timeoutId){
    let timeoutId = setTimeout(()=>{console.log('boo')},10000)
    // }
    clearTimeout(timeoutId)
    timeoutId = setTimeout(()=>{
        req.session.destroy()
        console.log("destroyed")
        console.log(timeoutId)
    // res.redirect('/')
    },10000)
    // req.autologouttimeoutId = timeoutId
    
    next()
    return timeoutId
}
async function clearlogout(timeoutId){
     clearTimeout(timeoutId);
    console.log(timeoutId)

    console.log("cleared")
}
function isauthenticated(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/')
    }
    console.log(req.session.user_id)
    next()
}

async function authenticate(req,res,next){
    const user_id = req.session.user_id

    if(user_id){
        const user = await User.findByPk(req.session.user_id,{
            include:{
                model: post,
                as:'posts'
            }
        })
        req.user = user.get({plain:true})
    }
    console.log(req.session.user_id)

    next()
}
module.exports = {isloggedin, isauthenticated,authenticate, autologout,clearlogout}