import{ default as connectToDb} from '../../../db';
import {Item} from '../../../models/item.model'


/**
 * @description delete item from shopping list
 * @param item id
 */

export default async (req, res) => {
    await connectToDb();
    const {query: {id}} = req;
    Item.findById(id)
    .then(item => item.remove().then( () => res.json('Deleted') ))
    .catch(err => res.status(404).json('Not deleted: ' + err))
}
