import { Router } from 'express'
import * as communitiesCtrl from '../controllers/communities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, communitiesCtrl.index) 

export { router }