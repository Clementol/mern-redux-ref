import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {User} from '../../models/user.model'; 
import handler from '../../handler';

import{ default as connectToDb} from '../../db';



const jwtsecret = process.env.jwtSecret
/**
 * @routes /api/authenticate
 * @description Auth user
*/

export default handler 

    .post( async (req, res) => {
        await connectToDb()
        res.setHeader('Content-Type', 'application/json')
        // collect data from user
        const {email, password} = req.body;
        
        // execute this if email and password is empty
        if ( !email || !password ) {
            return res.status(400).end(JSON.stringify("pls enter all fields"))            
        }
        // authenticate user
        User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400).end(JSON.stringify('User does not exits'))
            }
            
            if (!user.confirmed) {
                throw new Error("Please confirm your email to login")
            }
            // Valdate password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if (!isMatch) return res.status(400).end(JSON.stringify('Invalid password'));

                    jwt.sign(
                        {id: user.id},
                        jwtsecret,
                        {expiresIn: '30days'},
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        
        })
        .catch( e => {
            return res.status(400).end(JSON.stringify('Unable to login'))
        })
})

