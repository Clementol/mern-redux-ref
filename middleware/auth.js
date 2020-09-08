import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.jwtSecret

const auth = (req, res, next) =>{
    const token  = req.headers['x-auth-token'];
    console.log(token)
    //Check for token
    if (!token) return res.status(401).end(JSON.stringify('Authorization denied'))



    try {
          //Verify token
        const decoded = jwt.verify(token, jwtSecret);
        
        // Add user from payload
        req.user = decoded
        
        next()
    } catch (e) {
        res.status(401).end(JSON.stringify(`Token is not valid ${e}`))
    }
  
}

module.exports = auth