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
    const league = await League.create(req.body)
    res.status(201).json(league)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function standings(req, res) {
  try {
    const leagueStandings = await soccerApiMiddleware.getLeagueById(req.params.standingsId)
    res.status(201).json(leagueStandings)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function fixtures(req, res) {
  try {
    const leagueFixtures = await soccerApiMiddleware.getLeagueStandingsById(req.params.leagueId)
    res.status(201).json(leagueFixtures)
  } catch (error) {
    res.status(500).json(error)
  }
}


export {
  index,
  show,
  create,
  standings,
  fixtures
}