import { Profile } from "../models/profile.js"
import { Blog } from "../models/blog.js"
import { League } from "../models/league.js"

async function index(req, res) {
  try {
    const blogs = await Blog.find({})
      .populate(['author', 'league'])
      .sort({ createdAt: 'desc' })
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index
}