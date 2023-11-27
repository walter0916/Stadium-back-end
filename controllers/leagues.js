import { League } from "../models/league.js";

async function index(req, res) {
  try {
    const leagues = await League.find({})
    res.status(200).json(leagues)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index
}