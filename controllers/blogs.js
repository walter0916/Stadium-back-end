import { Profile } from "../models/profile.js"
import { Blog } from "../models/blog.js"
import { League } from "../models/league.js"
import { v2 as cloudinary } from 'cloudinary'

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

async function getUserBlogs(req, res) {
  try {
    const blogs = await Blog.find({author: req.params.profileId})
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
    .populate([
      'author',
      'league',
      {
        path: 'comments',
        populate: [
          {
            path: 'author',
          },
          {
            path: 'replies',
            populate: {
              path: 'author',
            },
          },
        ],
      },
    ])
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    console.log(req.body)
    req.body.author = req.user.profile
    req.body.league = await League.findById(req.body.leagueId)
    const blog = await Blog.create(req.body)
    console.log(blog)
    res.status(201).json(blog)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog', details: error.message, })
  }
}

async function addBlogPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const blog = await Blog.findById(req.params.blogId)
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    blog.photo = image.url
    await blog.save()
    res.status(201).json(blog.photo)
  } catch (err) {
    res.status(500).json(err)
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

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.blogId)
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
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteComment(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId)
    blog.comments.remove({ _id: req.params.commentId })
    await blog.save()
    res.status(200).json(blog)
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
    if (type === 'Like') {
      if (existingLike) {
        blog.likes.pull(existingLike._id)
      } else {
        blog.likes.push({ type, author: userId })
      }
    } 
    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addReply(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId);
    const commentId = req.params.commentId
    const comment = blog.comments.id(commentId)
    const { content } = req.body;
    const author = req.user.profile;
    const reply = {
      content,
      author,
    }
    comment.replies.push(reply)
    await blog.save()
    const newReply = comment.replies[comment.replies.length - 1]
    res.status(201).json(newReply)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteReply(req, res) {
  try {
    const blog = await Blog.findById(req.params.blogId)
    const commentId = req.params.commentId
    const comment = blog.comments.id(commentId)
    const replyId = req.params.replyId
    const reply = comment.replies.id(replyId)
    reply.remove()
    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}



export {
  index,
  show,
  getUserBlogs,
  create,
  update,
  addComment,
  addLikeOrDislike,
  addReply,
  deleteBlog,
  deleteComment,
  deleteReply,
  addBlogPhoto
}