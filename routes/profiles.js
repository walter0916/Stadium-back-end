import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:userId/edit', checkAuth, profilesCtrl.update)
router.put('/:userId/interests', checkAuth, profilesCtrl.addLeaguesToInterests)
router.put('/:userId/interests/edit', checkAuth, profilesCtrl.updateInterests)

export { router }
