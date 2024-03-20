import { Router } from 'express'
import * as leaguesCtrl from '../controllers/leagues.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, leaguesCtrl.index)
router.post('/', checkAuth, leaguesCtrl.create)
router.get('/standings/:standingsId', checkAuth, leaguesCtrl.standings)
router.get('/fixtures/:leagueId', checkAuth, leaguesCtrl.fixtures)
router.get('/leagueStats/:leagueId', checkAuth, leaguesCtrl.getLeagueStats)
router.get('/:leagueId', checkAuth, leaguesCtrl.show)
router.put('/getLeagueInfo', checkAuth, leaguesCtrl.getLeagueInformation)


export { router }