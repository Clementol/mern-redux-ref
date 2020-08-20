import handler from "../../handler";
import { User } from "../../models/user.model";
import * as auth from '../../middleware/auth';

export default handler
.use(auth)
/**
 * @routes GET /api/authenticate/user
 * @description Auth user
 * @access private
*/

.get( (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.end(JSON.stringify( user)) )
})