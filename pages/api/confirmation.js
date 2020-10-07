import handler from "../../handler"
import{ default as connectToDb} from '../../db';
import {User } from "../../models/user.model";
import { Token } from "../../models/token.model";

/**
 * @description to confirm user registration
*/
export default handler
    
    .post( async (req, res) => {
        await connectToDb()
        const { email, token } = req.body
        
        if (!token) {
            return res.status(400).end(JSON.stringify("Your token was not found!"))  
        }
        if (!email) {
            return res.status(400).end(JSON.stringify("please enter email in the field"))  
        }

        Token.findOne({token})
        .then( token => { 

            if (!token.token) {
                res.status(400).end(JSON.stringify(`We were unable to find a valid token. 
                                                Your confirmation link may have expired!`))
            }
            
            User.findOneAndUpdate({_id: token.userId, email: email},
                {$set: {confirmed: true} } ,
                { useFindAndModify: false},
                (err, user) => {
                    if (!user) {
                        res.status(400).end(JSON.stringify("We were unable to find a user for this token."))
                    }  
                
                }
            
            )
            .then( user => {
                    console.log(user)
                    if (user) {
                        res.status(200).end(JSON.stringify({confirmed: user.confirmed, msg: "The account has been verified. Please log in "}))
                    }

            })
        })
        .catch( err => {
            return res.status(400).end(JSON.stringify(`Error validating link. 
                                                Your confirmation link may have expired!`))
        } )
    
})