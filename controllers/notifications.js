import { Notification } from '../models/notification.js'
import { Blog } from '../models/blog.js'
import { Community } from '../models/community.js'

async function index(req, res) {
  try {
    const userId = req.user.profile
    const notifications = await Notification.find({ targetUser: userId })
      .populate('user', 'name')
      .populate('blog', 'title')
      .populate('post', 'content')
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
    const { type, blogId } = req.body
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

export {
  index,
  update,
  createBlogNotification
}
