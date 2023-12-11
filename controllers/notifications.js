import { Notification } from '../models/notification.js'
import { Blog } from '../models/blog.js'
import { Community } from '../models/community.js'

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
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { read: true },
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
    })
    res.status(201).json({ message: 'Notification created for blog interaction', notification })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function createCommentReplyNotification(req, res) {
  try {
    const { type, blogId, commentId } = req.body
    const user = req.user.profile
    const blog = await Blog.findById(blogId)
    const comment = blog.comments.id(commentId)
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
    const communityId = req.params.communityId
    const postId = req.params.postId
    const community = await Community.findById(communityId)
    const post = community.posts.id(postId);
    const targetUser = post.author._id
    const notification = await Notification.create({
      type,
      user,
      targetUser,
      blog: null,
      post: postId,
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
