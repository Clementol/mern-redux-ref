import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {User} from '../../models/user.model'; 

import handler from '../../handler';

const jwtsecret = process.env.jwtSecret;



/**
 * @routes /api/users
 * @description Register new users
*/

export default handler

    .post( async (req, res) => {
    
    res.setHeader('Content-Type', 'application/json')
     const {name, email, password} = req.body;
    
     
    if (!name || !email || !password) {
        return res.status(400).end(JSON.stringify("pls enter all fields"))
                    
    }
    await User.findOne({email})
    .then(user => {
        if (user) return res.status(400).end(JSON.stringify('user already exits'))
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
                    .then(user => {

                        jwt.sign(
                            {id: user.id},
                            jwtsecret,
                            {expiresIn: '30days'},
                            (err, token) => {
                                if (err) throw err
                                console.log(err)
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

                       
                    } )
                    
            })
        })
    })
    .catch(e => {
        res.status(400).end(JSON.stringify(`Unable to register: ${e}`))
    })
})

