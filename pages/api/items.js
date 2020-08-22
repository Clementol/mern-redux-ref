import{ default as connectToDb} from '../../db';
import {Item} from '../../models/item.model'
import handler from '../../handler';
// const auth =  require('../../middleware/auth')

/**
 * @description get all items
 * @access public
*/

export default handler
    .get( async (req, res) => {

    await connectToDb();
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    Item.find()
    .sort({date: -1})
    // .then(items => res.end(items))
    .then( item => res.end(JSON.stringify(item) ))
    .catch(err => res.status(400).end(JSON.stringify(`Error: Internet connection issues`)))
})
