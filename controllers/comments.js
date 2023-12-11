import { Comment } from "../models/comment.js";
import { Blog } from "../models/blog.js";

async function index(req,res) {
  try {
    const comments = await Comment.find({})
      .populate('author')
      .populate({
        path: 'replies',
        populate: {
            path: 'author'
          }
      })
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addComment(req, res) {
  try {
    const blogId = req.params.blogId 
    req.body.author = req.user.profile
    const newComment = await Comment.create(req.body)
    await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: newComment} },
      { new: true})
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteComment(req, res) {
  try {
    await Comment.findByIdAndDelete(req.params.commentId)
    const blog = await Blog.findById(req.params.blogId)
    blog.comments.remove({ _id: req.params.commentId })
    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addReply(req, res) {
  try {
    const commentId = req.params.commentId
    const comment = await Comment.findById(commentId)
    const { content } = req.body;
    const author = req.user.profile;
    const reply = {
      content,
      author,
    }
    comment.replies.push(reply)
    await comment.save()
    const newReply = comment.replies[comment.replies.length - 1]
    res.status(201).json(newReply)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteReply(req, res) {
  try {
    const commentId = req.params.commentId
    const comment = await Comment.findById(commentId)
    const replyId = req.params.replyId
    const reply = comment.replies.id(replyId)
    reply.remove()
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  addComment,
  deleteComment,
  addReply,
  deleteReply,
}