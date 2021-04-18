const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'CHan9975##',
      database : 'facerec-db'
    }
  });



const app = express();
app.use(bodyParser.json({
    extended: true
  }));
  app.use(cors())



app.post('/signin', (req, res) => {signin.handlesignin(req, res, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, () =>{
    console.log('app is running on port 3000');
})