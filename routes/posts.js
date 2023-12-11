import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as postsCtrl from '../controllers/posts.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, postsCtrl.index)
router.post('/:postId/:communityId', checkAuth, postsCtrl.addPost)
router.delete('/:postId/:communityId', checkAuth, postsCtrl.deletePost)
router.put('/:postId/replies', checkAuth, postsCtrl.addReply)
router.delete('/:postId/replies/:replyId', checkAuth, postsCtrl.deleteReply)
router.patch('/:postId/likes&dislikes', checkAuth, postsCtrl.addLikeOrDislikeToPost)
router.put('/:postId/add-photo', checkAuth, postsCtrl.addPostPhoto)

export { router }