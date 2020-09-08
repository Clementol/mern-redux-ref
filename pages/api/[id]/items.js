import{ default as connectToDb} from '../../../db';
import {User} from '../../../models/user.model'
import handler from '../../../handler';
import * as auth from '../../../middleware/auth';

/**
 * @description get all items
 * @access public
*/

export default handler
    .use(auth)
    .get( async (req, res) => {

    await connectToDb();
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const {query: {id}} = req;
    console.log(id)
    await User.findById(id)
    .then( user => res.status(200).json(user) )
    .catch(err => res.status(400).end(JSON.stringify(`Error: Unable to get items`)))
    
});
