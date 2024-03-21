import { League } from "../models/league.js"
import * as soccerApiMiddleware from '../config/helper.js'

async function index(req, res) {
  try {
    const leagues = await League.find({})
    res.status(200).json(leagues)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const league = await League.findById(req.params.leagueId)
    res.status(200).json(league)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const league = await League.create({ leagueData: req.body })
    res.status(201).json(league)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function standings(req, res) {
  try {
    const leagueStandings = await soccerApiMiddleware.getLeagueById(req.params.standingsId, req.params.year)
    res.status(201).json(leagueStandings)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function fixtures(req, res) {
  try {
    const leagueFixtures = await soccerApiMiddleware.getLeagueFixturesById(req.params.leagueId, req.params.year)
    res.status(201).json(leagueFixtures)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getLeagueInformation(req, res) {
  try {
    const leagueName = req.body.leagueName
    const leagueInformation = await soccerApiMiddleware.getLeagueInfo(leagueName)
    res.status(201).json(leagueInformation)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}

async function getLeagueStats(req, res) {
  try {
    const leagueId = req.params.leagueId
    const year = req.params.year
    const scorerStat = await soccerApiMiddleware.getLeagueTopScorers(leagueId, year)
    const assistsStat = await soccerApiMiddleware.getLeagueTopAssisters(leagueId, year)
    const leagueStats = [scorerStat.response, assistsStat.response]
    res.status(200).json(leagueStats)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getTeamStats(req, res) {
  try {
    const leagueId = req.params.leagueId
    const year = req.params.year
    const teamId = req.params.teamId
    const statsData = await soccerApiMiddleware.getTeamStatistics(leagueId,teamId,year)
  } catch (error) {
    
  }
}

export {
  index,
  show,
  create,
  standings,
  fixtures,
  getLeagueInformation,
  getLeagueStats,
  getTeamStats
}