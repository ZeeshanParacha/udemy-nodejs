const User = require('../models/user')
const AWS = require("aws-sdk")
const jwt = require('jsonwebtoken')
const { registerEmailParams } = require("../helpers/email")

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
          error: `We could not verify your email, please try again!`
        })
      })
  })
}