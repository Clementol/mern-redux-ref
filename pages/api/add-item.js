
import{ default as connectToDb} from '../../db';
import {Item} from '../../models/item.model'

/**
 * @description add item to shopping list
 * @param name 
 */

 export default async (req, res) => {
    await connectToDb();
    //res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save()
    .then( item => res.status(200).json(item) )
    .catch( err => res.status(400).json(`Error creating item ${err}`) )
 }