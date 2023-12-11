import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as commentsCtrl from '../controllers/comments.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, commentsCtrl.index)
router.post('/:blogId', checkAuth, commentsCtrl.addComment)
router.delete('/:blogId/:commentId', checkAuth, commentsCtrl.deleteComment)
router.post('/:blogId/:commentId/replies', checkAuth, commentsCtrl.addReply)
router.delete('/:blogId/:commentId/replies/:replyId', checkAuth, commentsCtrl.deleteReply)

export { router }