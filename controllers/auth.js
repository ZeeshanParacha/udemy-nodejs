const User = require('../models/user')
const AWS = require("aws-sdk")
const jwt = require('jsonwebtoken')
const { registerEmailParams } = require("../helpers/email")
const shortId = require('shortid')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  region: process.env.AWS_REGION
})
const SES = new AWS.SES({ apiVersion: "2010-12-01" })

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  //check if user already exist in database
  User.findOne({ email }).exec((err, user) => {
    if (user) return res.status(400).json({
      error: "Email already exist"
    })
    //generate token with username email and password
    const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '10m'
    })
    //send email
    const params = registerEmailParams(email, name, token)
    const sendEmailOnRegister = SES.sendEmail(params).promise();
    sendEmailOnRegister
      .then(response => {
        res.json({
          message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
        })
      })
      .catch(error => {
        res.json({
          message: `We could not verify your email, please try again!`
        })
      })
  })
}

exports.registerActivate = (req, res) => {
  const { token } = req.body
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        error: 'Expired link, Try again'
      })
    }
    const { name, email, password } = jwt.decode(token);
    const username = shortId.generate();

    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(401).json({
          error: 'email is taken'
        })
      }
      //creating new user
      const newUser = new User({ username, name, email, password })
      newUser.save((err, result) => {
        if (err) {
          return res.status(401).json({
            error: 'Error saving user in database, Try later'
          })
        }
        return res.json({
          message: "Registraion success, Please login"
        })
      })
    })
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    console.log('user', user)
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please register."
      })
    }
    // authenticate method from userSchema
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match."
      })
    }
    // generate token and send it to cleint
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role }
    })
  })
}