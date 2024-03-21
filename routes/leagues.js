import { Router } from 'express'
import * as leaguesCtrl from '../controllers/leagues.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, leaguesCtrl.index)
router.post('/', checkAuth, leaguesCtrl.create)
router.get('/:leagueId', checkAuth, leaguesCtrl.show)
router.get('/standings/:standingsId/:year', checkAuth, leaguesCtrl.standings)
router.get('/fixtures/:leagueId/:year', checkAuth, leaguesCtrl.fixtures)
router.get('/leagueStats/:leagueId/:year', checkAuth, leaguesCtrl.getLeagueStats)
router.get('/teamStats/:leagueId/:teamId/:year', checkAuth, leaguesCtrl.getTeamStats)
router.put('/getLeagueInfo', checkAuth, leaguesCtrl.getLeagueInformation)


export { router }