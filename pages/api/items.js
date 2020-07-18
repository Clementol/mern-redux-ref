import{ default as connectToDb} from '../../db';
import {Item} from '../../models/item.model'

/**
 * @description get all items
 * @access public
*/

export default async (req, res) => {
    await connectToDb();
    //res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    Item.find()
    .sort({date: -1})
    .then(items => res.status(200).json(items))
    //.then( item => res.end(JSON.stringify(item) ))
    .catch(err => res.status(400).json('Error: ' + err))
}
