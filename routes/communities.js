import { Router } from 'express'
import * as communitiesCtrl from '../controllers/communities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, communitiesCtrl.index)
router.get('/:communityId', checkAuth, communitiesCtrl.show)
router.post('/', checkAuth, communitiesCtrl.create)
router.patch('/:communityId/join', checkAuth, communitiesCtrl.joinCommunity)
router.delete('/:communityId', checkAuth, communitiesCtrl.deleteCommunity)
router.post('/:communityId/posts', checkAuth, communitiesCtrl.addPost)
router.patch('/:communityId/posts/:postId', checkAuth, communitiesCtrl.addLikeOrDislikeToPost)
router.delete('/:communityId/posts/:postId', checkAuth, communitiesCtrl.deletePost)
router.post('/:communityId/posts/:postId/replies', checkAuth, communitiesCtrl.addReply)
router.delete('/:communityId/posts/:postId/replies/:replyId', checkAuth, communitiesCtrl.deleteReply)

export { router }