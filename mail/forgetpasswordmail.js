const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,                  //587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.user , // generated ethereal user
      pass: process.env.pass, // generated ethereal password
    },
    
  });



/**
 * @param {*} userEmail 
 * @param {*} token 
 * @description Send email to user
  */

export const sendForgetPasswordMail = (userEmail, token) => { 

    return new Promise( (resolve, reject) => {
        transporter.sendMail({
            from: ' "Shopping Reset Password" no-reply<shooply@outlook.com>  ', //<no-reply-shooply@outlook.com> 
            to: JSON.stringify(userEmail),
            subject: "Password Reset",
            html: `<p>Your request to reset password.</p><br>
                    <b>The link below is valid for 10 minutes.</b>
                  <p>To reset password, click <a href="${process.env.siteUrl}/reset-password?token=${token}">here</a>.</p>  `
            },
            (err, info) => {
                if (err) {
                    console.log(err)
                    reject("Email not sent!")
                    return
                }
                if (info) {
                    resolve(`An email has been sent to ${userEmail}`)
                }
            }
        )
    }) 

};

