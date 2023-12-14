import { Router } from 'express'
import * as notificationsCtrl from '../controllers/notifications.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, notificationsCtrl.index )
router.get('/:profileId', checkAuth, notificationsCtrl.show)
router.put('/:notificationId/edit', checkAuth, notificationsCtrl.update)
router.post('/:blogId', checkAuth, notificationsCtrl.createBlogNotification)
router.post('/posts/:postId', checkAuth, notificationsCtrl.createPostNotification)
router.post('/comment', checkAuth, notificationsCtrl.createCommentReplyNotification)

export { router }