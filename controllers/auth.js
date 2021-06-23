const { template } = require("../email-templates/verification");
const User = require('../models/user')
const AWS = require("aws-sdk")
const jwt = require('jsonwebtoken')

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
    const activationUrl = `${process.env.CLIENT_URL}/auth/activate/${token}`
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: { ToAddresses: [email] },
      ReplyToAddresses: [process.env.EMAIL_TO],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: template(activationUrl, name)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: "Complete your registration"
        }
      }
    };
    const sendEmailOnRegister = SES.sendEmail(params).promise();
    sendEmailOnRegister
      .then(res => {
        console.log("email submitted to SES", res);
        res.send({ success: 'Email Sent' })
      })
      .catch(error => {
        console.log("email submitted to SES", error);
        res.send({ error: 'Email Failed' })
      })
  })

}