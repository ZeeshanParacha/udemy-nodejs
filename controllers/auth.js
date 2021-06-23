const AWS = require("aws-sdk")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  region: process.env.AWS_REGION
})
const SES = new AWS.SES({ apiVersion: "2010-12-01" })

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: { ToAddresses: [email] },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><h1>Hello ${name}</h1><p>Test Email</p></body></html>`
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
      res.send('Email Sent')
    })
    .catch(error => {
      console.log("email submitted to SES", error);
      res.send('Email Failed')
    })
}