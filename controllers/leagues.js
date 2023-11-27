import { League } from "../models/league.js";

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

export {
  index,
  show,
  create
}