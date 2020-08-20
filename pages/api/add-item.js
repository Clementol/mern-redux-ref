import{ default as connectToDb} from '../../db';
import {Item} from '../../models/item.model'
const auth =  require('../../middleware/auth')
import handler from '../../handler';

/**
 * @description add item to shopping list
 * @param name 
 * @access privae
 */

 export default handler
    //middleware
    .use(auth)
    .post( async (req, res) => {
        await connectToDb();
       
        const {name} = req.body

        if (!name) {
            return res.status(400).end(JSON.stringify("pls enter name field"))
        }

        const newItem = new Item({
            name: name
        })
        Item.findOne({name})
        .then( name => {
            if (name) res.status(400).end(JSON.stringify(`Item already existed!`));
            newItem.save()
            .then( item => {  
                res.status(201).json(item);
            })
            .catch( err => res.status(400).end(JSON.stringify(`Error creating item ${err}`)) )
        })
        .catch(err => res.status(400).end(JSON.stringify(`Unable to add item`)))
 })