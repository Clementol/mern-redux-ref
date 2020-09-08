import{ default as connectToDb} from '../../../../db';
import {User} from '../../../../models/user.model'
import handler from '../../../../handler';
import * as auth from '../../../../middleware/auth'


/**
 * @description delete item from shopping list
 * @param item id, 
 * @param item name
 * @access private
 */

export default handler 
    // middleware
    .use(auth)
    .delete( async (req, res) => {
        await connectToDb();
        const {query: {id}} = req;
        const {query: {name}} = req;
        await User.findByIdAndUpdate(id,
            {$pull: {items: name}},
            {new: true, useFindAndModify: false}   
        )
        .then(user => res.status(200).end(JSON.stringify('Deleted')) )
        .catch(err => res.status(404).end(JSON.stringify('Not deleted')))
})
