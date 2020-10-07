import * as crypto from 'crypto'
import handler from "../../handler";
import { User } from "../../models/user.model";
import{ default as connectToDb} from '../../db';
import { ResetPasswordToken } from "../../models/resetpassword.model";
import { sendForgetPasswordMail } from '../../mail/forgetpasswordmail';

/**
 * @description to send email to user to reset password
*/

export default handler
    .post( async (req, res) => {
        await connectToDb();
        const {email} = req.body;
        if (!email) {
            return res.status(400).end(JSON.stringify("please enter email in the field"))  
        }
        User.findOne({email})
        .then( user =>  {
            if (!user) {
                res.status(400).end(JSON.stringify("We were unable to find a user with this email."))
            }
            const passwordToken = new ResetPasswordToken({
                userId : user.id,
                token : crypto.randomBytes(16).toString('hex')
            })
            passwordToken.save( () => {

                sendForgetPasswordMail(email, passwordToken.token)
                .then(msg => res.status(200).end(JSON.stringify(msg)))
                .catch(err => res.status(400).end(JSON.stringify(err)) )
            });
            
        })
        .catch(err => {
            res.status(400).end(JSON.stringify("Unable to send mail"))
        })
    })