import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, blogsCtrl.index)
router.post('/', checkAuth, blogsCtrl.create)
router.put('/:blogId/add-photo', checkAuth, blogsCtrl.addBlogPhoto)
router.get('/:blogId', checkAuth, blogsCtrl.show)
router.put('/:blogId', checkAuth, blogsCtrl.update)
router.get('/userBlogs/:profileId', checkAuth, blogsCtrl.getUserBlogs)
router.post('/:blogId/comments', checkAuth, blogsCtrl.addComment)
router.patch('/:blogId/likesordislikes', checkAuth, blogsCtrl.addLikeOrDislike)
router.post('/:blogId/comments/:commentId/replies', checkAuth, blogsCtrl.addReply)
router.delete('/:blogId', checkAuth, blogsCtrl.deleteBlog)
router.delete('/:blogId/comments/:commentId', checkAuth, blogsCtrl.deleteComment)
router.delete('/:blogId/comments/:commentId/replies/:replyId', checkAuth, blogsCtrl.deleteReply)

export { router }