import * as crypto from "crypto"

import handler from "../../handler"
import{ default as connectToDb} from '../../db';
import {User } from "../../models/user.model";
import { sendRegistrationMail } from '../../mail/registermMail';
import { Token } from "../../models/token.model";

/**
 * @description to resend confirmation link
*/

export default handler
    
    .post( async (req, res) => {
        await connectToDb()
        const { email } = req.body
    
        if (!email) {
            return res.status(400).end(JSON.stringify({msg: "please enter email in the field", id: ''}))  
        }

        User.findOne({email})
        .then(user => {
            if (!user) {
                res.status(400).end(JSON.stringify({msg: 'We were unable to find a user with that email.', id: ''}) );
            }

            if (user.confirmed) {
                res.status(400).end(JSON.stringify({msg: 'This account has already been verified. Please log in.', id: 'VERIVIED'}));
            }

            const userToken  = new Token({
                userId: user.id,
                token: crypto.randomBytes(16).toString('hex')
            })
            userToken.save( (err) => {
                if (err) {
                    return res.status(400).end(JSON.stringify(err.message))
                }

                // To send email to user registering
                if (!user.confirmed) {
                    sendRegistrationMail(email, userToken.token)
                    .then( msg =>  {
                        res.status(200).end(JSON.stringify(msg))
                    })
                    .catch(err => {
                        res.status(400).end(JSON.stringify({msg: err, id: ''}))
                    })
                }
                
            })
        })
        .catch(e => {
            res.status(400).end(JSON.stringify(`Email does not exist! ${e}`))
        })

})
console.log('')