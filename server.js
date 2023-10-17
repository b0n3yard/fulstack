const express = require('express')
const path =  require('path')
const routes = require(path.join(__dirname,'controllers/view_routes'))
const routes2 = require(path.join(__dirname,'controllers/user_routes'))
const db = require('./db/connections')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
const POST = process.env.PORT || 3335
app.use('/', routes)
app.use('/', routes2)

db.sync({force: false}).then(()=>{
app.listen(POST, () => {console.log(`started, listening on ${POST}`); console.log('stop server by hitting ctrl + c')})
})