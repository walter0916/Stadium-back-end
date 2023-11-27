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

async function show(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId)
      .populate(['author', 'league'])
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    req.body.league = await League.findById(req.body.leagueId)
    const blog = await Blog.create(req.body)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true }
    )
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addComment(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId)
    req.body.author = req.user.profile
    blog.comments.push(req.body)
    await blog.save()
    const newComment = blog.comments[blog.comments.length - 1]
    res.status(200).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addLikeOrDislike(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId)
    const { type } = req.body
    const userId = req.user.profile
    const existingLike = blog.likes.find(like => like.author.equals(userId))
    const existingDislike = blog.dislikes.find(dislike => dislike.author.equals(userId))
    if (type === 'Like') {
      if (existingLike) {
        blog.likes.pull(existingLike._id)
      } else {
        blog.likes.push({ type, author: userId })
      }
      if (existingDislike) {
        blog.dislikes.pull(existingDislike._id)
      }
    } else if (type === 'Dislike') {
      if (existingDislike) {
        blog.dislikes.pull(existingDislike._id)
      } else {
        blog.dislikes.push({ type, author: userId })
      }
      if (existingLike) {
        blog.likes.pull(existingLike._id)
      }
    }
    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}



export {
  index,
  show,
  create,
  update,
  addComment,
  addLikeOrDislike
}