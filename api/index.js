const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const env = require('dotenv').config()


const app = express()

const port = process.env.PORT
const cors = require("cors");
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize())
const jwt = require('jsonwebtoken')


mongoose.connect(process.env.MONGO
).then(() =>{
    console.log('CONNECTED TO MONGO-DB')
}).catch((err) =>{
console.log("Error connecting to MongoDB",err)
})

app.listen(port, () =>{
    console.log(`Connected to port:${port}`)
})



const User = require("./models/user");
const Message = require("./models/message");
// Endpoint for registration of the user
app.post("/register", (req, res) => {
    const { name, email, password, image } = req.body;
  
    // create a new User object
    const newUser = new User({ name, email, password, image });
  
    // save the user to the database
    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        console.log("Error registering user", err);
        res.status(500).json({ message: "Error registering the user!" });
      });
  });
  
  