const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
require('dotenv').config()
const { loginController, signController } = require('./controllers/userController')
const blogroutes=require('./routes/blogroutes')
const editroutes=require('./routes/editroutes')
const deleteroutes=require('./routes/deleteroutes')
const createroutes=require('./routes/createroutes')
const profileroutes=require('./routes/profile');


mongoose.connect('mongodb://127.0.0.1:27017/blogApp').then(() => {
  console.log('database sucessfully connected.....');
}).catch((err) => {
  console.log('database not connected.....', err);
})


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieparser())

app.use('/Blogs',blogroutes)
app.use('/editblog',editroutes)
app.use('/deleteblog',deleteroutes);
app.use('/create-blog',createroutes);
app.use('/profile',profileroutes);

app.get('/', (req, res) => res.render('home'));
app.get('/about',(req,res)=>res.render('about'));
app.get('/login', (req, res) => res.render('login',{message:null}));
app.get('/sign', (req, res) => res.render('sign',{message:null}));
app.get('/logout', (req, res) => res.clearCookie('uid').redirect('/login'));

app.post('/sign', signController);
app.post('/login', loginController)


app.listen( 5000, () => {
  console.log('Server connected.....')
});