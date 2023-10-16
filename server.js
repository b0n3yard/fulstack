const express = require('express')
const path =  require('path')
const routes = require(path.join(__dirname,'controllers/view_routes'))
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
const POST = process.env.PORT || 3335
app.use('/', routes)


app.listen(POST, () => {console.log(`started, listening on ${POST}`); console.log('stop server by hitting ctrl + c')})
