const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const Cryptr = require('cryptr');
const User = require('./models/userModel');
const Bank = require('./models/passcodebank.js');
const cryptr = new Cryptr('mySecretKey');


//Mongo DEPRECATION
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());





                                                                //MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/safedb')

mongoose.connection.once('open', function(){
  console.log('MongoDB is connected');
}).on('error', function(error){
  console.log('Error in connection:', error);
});





                //ENDPOINT - SIGNIN
app.post('/signin', (req, res) => {
  const SignIn = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({
    email: SignIn.email
  })
  .then(user => {
    if (user) {
      async function compHash() {
        const compareValues = await bcrypt.compare(SignIn.password, user.password);
        (compareValues) ? res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email
        })
        : res.json('Invalid password!')
      }
      compHash();
    } else{
      res.json('User not found!')
    }
  })
  .catch(err => {
    res.send('error catch: ' + err)
  })
})




                  //ENDPOINT - REGISTER
app.post('/register', (req, res) => {
  const today = new Date();

  const UserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: UserData.email
  })
  .then(user => {
    if (!user){
                      //HASH THE PASSWORD
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          UserData.password = hash;
          let user = new User(UserData)
          user.save().then(() => {
            console.log('Saved')
            res.json(UserData.email + ' registered successfully!')
          })
        })
      })
    } else {
      res.json('User already exists!')
    }
  })
}) 

 

                //COLLECT USER INPUTS
app.post('/store', (req, res) => {
  const created = new Date();
  // const userId = user._id;
  const Storex = {
    platform: req.body.platform,
    userId: req.body.userId,
    email: req.body.email,
    password: req.body.password,
    created: created
  }

  async function encryptNSave() {
    const encryptedString = await cryptr.encrypt(Storex.password);
    Storex.password = encryptedString;
    let user = new Bank(Storex);
    user.save(Storex).then((err) => {
      if (err) {
        res.json(err)
      } else {
        res.json(Storex)
      }
    })
  }

  encryptNSave();
  
})
                                   

            //SEND CREDENTIALS TO THE FRONTEND 
app.get('/credentials', (req, res) => {
console.log(req.query.userId);
  Bank.find({
    userId: req.query.userId
  })
  .then((err, data) => {
    if (err) {

      res.json(err)
    } else {
console.log(data);
      res.json(data)
    }
  })
})


//LISTEN ON PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})
