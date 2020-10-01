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
            return res.status(400).end(JSON.stringify({msg: "pls enter all fields", id: ''}))            
        }
        // authenticate user
        User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(401).end(JSON.stringify({msg: 'User does not exits!', id: ''}))
            }
            
            if (!user.confirmed) {
                return res.status(401).end(JSON.stringify({msg: 'Your account has not been verified!', id: 'NOT_VERIVIED'}))
            }
            // Valdate password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if (!isMatch) return res.status(400).end(JSON.stringify({msg: 'Invalid password', id: ''}));

                    jwt.sign(
                        {id: user.id},
                        jwtsecret,
                        {expiresIn: '30days'},
                        (err, token) => {
                            if (err) throw err
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    confirmed: user.confirmed
                                }
                            })
                        }
                    )
                })
        
        })
        .catch( e => {
            return res.status(400).end(JSON.stringify({msg: 'Unable to login', id: ''}))
        })
})

