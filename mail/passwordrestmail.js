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
 * @description Send email to user
  */

export const sendPasswordResetMail = (userEmail) => { 

    return new Promise( (resolve, reject) => {
        transporter.sendMail({
            from: ' "ShoppingList" no-reply<shooply@outlook.com> ',
            to: JSON.stringify(userEmail),
            subject: "Updated Password",
            html: `<p>This is to notify you that your password has been updated successfully.</p>`
            },
            (err, info) => {
                if (err) {
                    reject("Email not sent!")
                    return
                }
                if (info) {
                    resolve(`Your password has been updated`)
                }
            }
        )
    }) 

};
