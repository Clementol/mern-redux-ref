import{ default as connectToDb} from '../../../db';
import {Item} from '../../../models/item.model'
import handler from '../../../handler';
import * as auth from '../../../middleware/auth'


/**
 * @description delete item from shopping list
 * @param item id
 * @access private
 */

export default handler 
    // middleware
    .use(auth)
    .delete( async (req, res) => {
        await connectToDb();
        const {query: {id}} = req;
        Item.findById(id)
        .then(item => item.remove().then( () => res.end(JSON.stringify('Deleted')) ))
        .catch(err => res.status(404).end(JSON.stringify('Not deleted: ' + err)))
})
