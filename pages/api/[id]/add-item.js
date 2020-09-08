import{ default as connectToDb} from '../../../db';
import {User} from '../../../models/user.model';
import {Item} from '../../../models/item.model';

const auth =  require('../../../middleware/auth')
import handler from '../../../handler';

/**
 * @description add item to shopping list
 * @param name 
 * @access privae
 */

 export default handler
    //middleware
    .use(auth)
    .post( async (req, res, next) => {
        await connectToDb();
        console.log('query', res)
        const {query: {id}} = req;
        console.log(id)
        const {name} = req.body

        if (!name) {
            return res.status(400).end(JSON.stringify("pls enter name field"))
        }
    
        await User.findById(id)
        .then(user => {
            let itemExist;
            itemExist = user.items.some(item => {
                console.log(item, name)
                return item === name
            })
            
            console.log(itemExist)
            if (itemExist) {
                res.status(400).end(JSON.stringify(`Item already existed!`));
            } 
        })
        const itemReturn = user => user.items[user.items.length - 1]
        await User.findByIdAndUpdate(id,
            {$addToSet: {items : name }} ,
             {new: true, useFindAndModify: false},
            (err, user) => {
                // res.status(200).json({name: itemReturn(user)})
            }
        )
        .then(user => res.status(200).json({name: itemReturn(user)}) )
        .catch( err => res.status(400).end(JSON.stringify(`Unable to add new item ${err}`)) )
    })
        


let a = [{
    name: 'Clm'
}]
a.some(i => {
    if (i.name === 'Clem') {a.push('Good')}
    else {

        a.push('wrong')
    }
})
console.log(a)