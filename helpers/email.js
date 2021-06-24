const { template } = require("../email-templates/verification");
exports.registerEmailParams = (email, name, token) => {
  const activationUrl = `${process.env.CLIENT_URL}/auth/activate/${token}`
  return {
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
}