const express = require('express')
const path =  require('path')
const routes = require(path.join(__dirname,'controllers/view_routes'))
const routes2 = require(path.join(__dirname,'controllers/user_routes'))
const routes3 = require(path.join(__dirname,'controllers/post_routes'))
const db = require('./db/connections')
const { engine } = require('express-handlebars') ;
const session = require('express-session') ;
const app = express()
// app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))
const POST = process.env.PORT || 3335
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true
    }
  }));
app.use('/', routes)
app.use('/', routes2)
app.use('/', routes3)

db.sync({force: false}).then(()=>{
app.listen(POST, () => {console.log(`started, listening on ${POST}`); console.log('stop server by hitting ctrl + c')})
})