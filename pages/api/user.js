import handler from "../../handler";
import { User } from "../../models/user.model";
import * as auth from '../../middleware/auth';

export default handler
.use(auth)
/**
 * @routes GET /api/authenticate/user
 * @description Auth use
 * @access private
*/

.get( async (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => await res.end(JSON.stringify( user)) )
        .catch(err => res.status(400).end(JSON.stringify(`Unable to get user ${err}`)))
})