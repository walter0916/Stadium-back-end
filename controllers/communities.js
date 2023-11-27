import { Community } from "../models/community.js";
import { Profile } from "../models/profile.js";

async function index(req,res) {
  try {
    const communities = await Community.find({})
      .populate('posts')
    res.status(200).json(communities)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index
}