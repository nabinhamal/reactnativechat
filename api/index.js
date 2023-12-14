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
  

  //function to create a token for the user
const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //check if the email and password are provided
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }

  //check for that user in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        //user not found
        return res.status(404).json({ message: "User not found" });
      }

      //compare the provided passwords with the password in the database
      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("error in finding the user", error);
      res.status(500).json({ message: "Internal server Error!" });
    });
});
  

//endpoint to acces all the user