import{ default as connectToDb} from '../../db';
import {Item} from '../../models/item.model'
import {User} from '../../models/user.model'
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
        console.log('query', res)
        // const {query: {id}} = req;
        // console.log(id)
        const {name} = req.body

        if (!name) {
            return res.status(400).end(JSON.stringify("pls enter name field"))
        }

        // const newItem = new Item({
        //     name: name
        // })
        User.findById({id})
        .then( user => {
            if ( name in user.items ) res.status(400).end(JSON.stringify(`Item already existed!`));
            //user.items.map(item => name === item
        })
        
            //newItem.save()
        User.findByIdAndUpdate(
            req.user.id,
            {
                $addToSet: {
                    items: name
                }
            },
            {new: true, useFindAndModify: false},
            (err, result) => {
                if (err) res.json(JSON.stringify(err))
                res.json(result)
            }
        )
        // .then( user => {  
        //     if (user.items.map(item => item === name )  ) res.status(400).end(JSON.stringify(`Item already existed!`));
        //     res.status(201).json(user);
        // })
        // .catch( err => res.status(400).end(JSON.stringify(`Error creating item ${err}`)) )
        // })
        //.catch(err => res.status(400).end(JSON.stringify(`Unable to add item`)))
})
 