const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require ('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const image = require('./controllers/image.js')
const profile = require('./controllers/profile.js')

const db = knex({
  client: 'pg',
  connection:"postgres://postgresql_pgadmin_9xmd_user:htmgvotoWr6eh7FRGJnF3crImTRoy5OA@dpg-cg7367pmbg5ab7mqh0r0-a/postgresql_pgadmin_9xmd"
});

const app = express();


app.use(bodyParser.json())
app.use(cors());


app.get('/',(req,res)=>{	res.json("database.users")})


app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)}) 


app.get('/profile/:id',(req,res)=>{profile.getProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/image',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3001,()=>{
	console.log(`app is running on port ${process.env.PORT}`)
})