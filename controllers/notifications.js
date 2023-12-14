import { Notification } from '../models/notification.js'
import { Blog } from '../models/blog.js'
import { Community } from '../models/community.js'
import { Comment } from '../models/comment.js'
import { Post } from '../models/post.js'

async function index(req, res) {
  try {
    const notifications = await Notification.find({})
      .populate('user')
      .populate('blog')
      .populate('post')
    res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const notifications = await Notification.find({
      targetUser: req.params.profileId
    })
      .populate('user')
      .populate('blog')
      .populate('post')
    res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}


async function update(req, res) {
  try {
    const { read } = req.body
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { read },
      { new: true }
    )
    res.status(200).json({ message: 'Notification marked as read', notification })
  } catch (error) {
    res.status(500).json(error)
  } 
}

async function createBlogNotification(req, res) {
  try {
    const { type } = req.body
    const blogId = req.params.blogId
    const user = req.user.profile
    const blog = await Blog.findById(blogId)
    const notification = await Notification.create({
      type,
      user,
      targetUser: blog.author,
      blog: blogId,
      post: null,
      comment: null,
    })
    res.status(201).json({ message: 'Notification created for blog interaction', notification })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function createCommentReplyNotification(req, res) {
  try {
    const { type } = req.body
    const blogId = req.params.blogId
    const commentId = req.params.commentId
    const user = req.user.profile
    const comment = await Comment.findById(commentId)
    const notification = await Notification.create({
      type,
      user,
      targetUser: comment.author,
      blog: blogId,
      post: null,
      comment: commentId,
    })
    res.status(201).json({ message: 'Notification created for comment reply', notification })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}


async function createPostNotification(req, res) {
  try {
    const { type } = req.body
    const user = req.user.profile
    const postId = req.params.postId
    const post = await Post.findById(postId)
    const targetUser = post.author._id
    const notification = await Notification.create({
      type,
      user,
      targetUser,
      blog: null,
      post: postId,
      comment: null,
    })
    res.status(201).json({ message: 'Notification created for post interaction', notification })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

export {
  index,
  show,
  update,
  createBlogNotification,
  createPostNotification,
  createCommentReplyNotification
}
