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

export const sendRegistrationMail = (userEmail, token) => { 

    return new Promise( (resolve, reject) => {
        transporter.sendMail({
            from: ' "Shopping Registration Confirmation" no-reply<shooply@outlook.com>  ', //<no-reply-shooply@outlook.com> 
            to: JSON.stringify(userEmail),
            subject: "ShoppingList",
            html: `<p>This mail is to confirm if you've just registered at ShoppigList.</p><br>
                    <b>The link below is valid for 10 minutes.</b>
                  <p>To complete registration, click <a href="${process.env.siteUrl}/confirmation?token=${token}">here</a>.</p>  `
            },
            (err, info) => {
                if (err) {
                    reject("Email not sent!")
                    return
                }
                if (info) {
                    resolve(`A verification email has been sent to ${userEmail}`)
                }
            
            }
        )
    }) 

};
