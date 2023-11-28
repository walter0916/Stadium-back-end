import { Router } from 'express'
import * as notificationsCtrl from '../controllers/notifications.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, notificationsCtrl.index )
router.get('/:notificationId', checkAuth, notificationsCtrl.update)
router.post('/blog', checkAuth, notificationsCtrl.createBlogNotification)

export { router }