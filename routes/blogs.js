import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, blogsCtrl.index)
router.post('/', checkAuth, blogsCtrl.create)
router.get('/:blogId', checkAuth, blogsCtrl.show)
router.put('/:blogId', checkAuth, blogsCtrl.update)
router.post('/:blogId/comments', checkAuth, blogsCtrl.addComment)

export { router }