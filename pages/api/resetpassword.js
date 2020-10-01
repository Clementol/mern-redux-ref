import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

import handler from "../../handler"
import{ default as connectToDb} from '../../db';
import {User } from "../../models/user.model";
import { ResetPasswordToken } from "../../models/resetpassword.model";
import { sendPasswordResetMail } from '../../mail/passwordrestmail';

/**
 * @description to reset user password
*/
export default handler
    
    .post( async (req, res) => { 
        await await connectToDb();

        const { password, reTypePassword, token  } = req.body
        
        if (!token) {
            return res.status(400).end(JSON.stringify("Your token was not found!"))  
        }
        if (password !== reTypePassword) {
            return res.status(400).end(JSON.stringify("Please make sure the passwords correspond"))  
        }

        ResetPasswordToken.findOne({token})
        .then(token => {
            if (!token.token) {
                res.status(400).end(JSON.stringify(`We were unable to find a valid token. 
                                                Your confirmation link may have expired!`))
            }

            bcrypt.genSalt(10, (er, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    const updatedPassword = hash;

                    User.findOneAndUpdate({_id: token.userId},
                        {$set: {password: updatedPassword} } ,
                        { useFindAndModify: false},
                        (err, user) => {
                            if (!user) {
                                res.status(400).end(JSON.stringify("We were unable to find a user for this token."))
                            }  
                        }
                        
                    
                    )
                    .then( (user) => {
                        sendPasswordResetMail(user.email)
                        .then(msg => res.status(200).end(JSON.stringify(msg)) )
                        .catch(err => res.status(400).end(JSON.stringify(err)))

                    })
                    .catch( () => res.status(400).end(JSON.stringify("Error updating password")) )

                })
            })
        })
        .catch( err => {
            return res.status(400).end(JSON.stringify(`Error validating link. 
                                                Your confirmation link may have expired!`))
        } )
    
    })