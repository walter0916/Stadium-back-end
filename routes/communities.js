import { Router } from 'express'
import * as communitiesCtrl from '../controllers/communities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, communitiesCtrl.index)
router.post('/', checkAuth, communitiesCtrl.create)
router.get('/:communityId', checkAuth, communitiesCtrl.show)
router.get('/:teamId/:year/fixtures', checkAuth, communitiesCtrl.getTeamFixtures)
router.put('/:communityId/join', checkAuth, communitiesCtrl.joinCommunity)
router.put('/:communityId/leaveCommunity', checkAuth, communitiesCtrl.leaveCommunity)
router.delete('/:communityId', checkAuth, communitiesCtrl.deleteCommunity)

export { router }