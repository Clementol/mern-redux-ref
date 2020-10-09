import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as crypto from "crypto"

import handler from '../../handler';
import {User} from '../../models/user.model'; 
import  {Token} from '../../models/token.model';
import{ default as connectToDb} from '../../db';
import { sendRegistrationMail } from '../../mail/registermMail';
import { json } from 'express';

// environment variables
const jwtsecret = process.env.jwtSecret;

/**
 * @routes /api/users
 * @description Register new users
*/

export default handler

    .post( async (req, res) => {
    
    res.setHeader('Content-Type', 'application/json')

     const {name, email, password, reTypePassword} = req.body;
     
    if (!name || !email || !password || !reTypePassword) {
        return res.status(400).end(JSON.stringify("pls enter all fields"))
                    
    }
    if (password !== reTypePassword) {
        return res.status(400).end(JSON.stringify("Please make sure the passwords correspond"))
    }
    await connectToDb();
    await User.findOne({email})
    .then(user => {
        if (user) return res.status(400).end(JSON.stringify('user already exits!'))
        
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });
        

        // create salt & hash
        bcrypt.genSalt(10, (er, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash
                newUser.save()
                .then( user => {

                    jwt.sign(
                        {id: user.id},
                        jwtsecret,
                        {expiresIn: '30days'},
                        (err, token) => {
                            if (err) {
                                res.status(400).end(JSON.stringify(err))
                            }
                            console.log(token)
                            
                            const userToken  = new Token({
                                userId: user.id,
                                token: crypto.randomBytes(16).toString('hex')
                            })
                            
                            userToken.save( (err) => {
                                // if (err) {
                                //     return res.status(400).end(JSON.stringify(`er -> ${err}`))
                                // }
                                // To send email to user registering
                                sendRegistrationMail(email, userToken.token)
                                .then( msg =>  {
                                    res.status(200).end(JSON.stringify({msg: msg, confirmed: user.confirmed}))
                                })
                                .catch(err => {
                                    res.status(400).end(JSON.stringify(err))
                                })
                                 
                            })
                        }
                    )  

                })
                    
                    
            })
        }) // bycypt
       
    })
    .catch(e => {
        res.status(400).end(JSON.stringify(`Unable to register`))
    })

})
