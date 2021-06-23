const template = (url, name) => {
  return `<div style="background: #f2f3f5; padding: 30px; font-family: 'Roboto', sans-serif;">
                <div style="width: 536px; height: auto; background: #ffffff; border-radius: 16px; margin: 0 auto;">
                    <div style="border-bottom: #e4e5e7 solid 2px; padding: 30px; text-align: center;">
                        <img style="height: 36px; margin-right: 15px;" src="https://f001.backblazeb2.com/file/autopilot1/logo.png" />
                    </div>

                    <div style="margin-top: 30px; padding: 25px 30px; letter-spacing: 1px;">
                        <div style="font-style: normal; font-weight: normal; font-size: 36px; text-align: center; color: #141414; margin: 25px 0 15px 0; letter-spacing: 0.01em;">Hi, ${name}</div>
                        <p style="margin-top: 15px; font-size: 14px; text-align:center; color: #141414; opacity: 0.75; line-height: 20px; letter-spacing: 0.01em;">We are attempting to verify your email address used in your Autopilot account.</p>
                        <div style="margin: 32px 0; text-align: center; padding: 15px;">
                            <a href="${url}" style="text-decoration: none; background: #05c46b; border-radius: 8px; padding: 15px 25px; font-style: normal; font-weight: 500; font-size: 14px; color: #ffffff; letter-spacing: 0.01em;">Confirm Email Address</a>
                        </div>

                        <div style="padding: 0px 0 32px 0;">
                            <p style="font-style: normal; font-weight: normal; font-size: 13px; line-height: 20px; color: #141414; opacity: 0.75; letter-spacing: 0.01em;">If the above link did not work for some reason, you can copy and paste the below link into your browser</p>
                            <div style="background: #DCF8EC; border-radius: 8px; margin: 25px 0; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center;  text-align: center; padding: 15px;">
                                <a style="color: #05C46B; letter-spacing: 0.01em;">${url}</a>
                            </div>
                            <p style="font-style: normal; font-weight: normal; font-size: 13px; line-height: 20px; color: #141414; opacity: 0.75; letter-spacing: 0.01em;">Once you have successfully verified using the link above, you'll be taken back to Autopilot.</p>
                            <p style="margin-top: 35px; font-style: normal; font-weight: normal; font-size: 13px; line-height: 20px; color: #141414; opacity: 0.75; letter-spacing: 0.01em;">If you did not request this verification, please ignore this message or contact <a style="font-style: normal; font-weight: normal; font-size: 12px; line-height: 13px; color: #05c46b; letter-spacing: 0.01em;" href="mailto:support@autopilot.io">support@autopilot.io</a> for assistance</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div style="width: 536px; height: auto; margin: 0 auto; padding-bottom: 50px;">
                    <div>
                            <ul style="list-style: none; padding: 0; text-align: center; margin-left: 110px;">
                                <li style="margin-right: 25px; float: left;"><a style="font-style: normal; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center; color: #7b8497; opacity: 0.75;">Unsubscribe</a></li>
                                <li style="margin-right: 25px; float: left;"><a style="font-style: normal; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center; color: #7b8497; opacity: 0.75;">Privacy Policy</a></li>
                                <li style="float: left;"><a style="font-style: normal; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center; color: #7b8497; opacity: 0.75;">Contact Support</a></li>
                            </ul>
                            <div style="clear: both;"></div>
                    </div>
                    <p style="list-style: none; padding: 0; font-style: normal; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center; color: #7b8497; opacity: 0.75;">510 Thompson Stream Suite 601</p>
                    <p style="list-style: none; padding: 0; font-style: normal; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center; color: #7b8497; opacity: 0.75;">@ 2021 react-node-aws Inc.</p>
                    </div>
                </div>
            </div>`
}
module.exports = { template };