import { Post } from "../models/post.js";
import { Community } from "../models/community.js";
import { v2 as cloudinary } from 'cloudinary'


async function index(req,res) {
  try {
    const posts = await Post.find({})
      .populate('author')
      .populate({
        path: 'replies',
        populate: {
            path: 'author'
          }
      })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getUsersPosts(req,res) {
  try {
    const posts = await Post.find({author: req.params.profileId})
      .populate('author')
      .populate({
        path: 'replies',
        populate: {
            path: 'author'
          }
      })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPost(req, res) {
  try {
    const { communityId } = req.params
    req.body.author = req.user.profile
    req.body.community = communityId
    const newPost = await Post.create(req.body)
    const community = await Community.findById(communityId)
    community.posts.push(newPost)
    await community.save()
    await newPost.populate('author')
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addLikeOrDislikeToPost(req, res) {
  try {
    const postId = req.params.postId
    const userId = req.user.profile
    const post = await Post.findById(postId)
    const existingLikeDislike = post.likes.concat(post.dislikes).find(
      (ld) => ld.author.equals(userId)
    )
    if (existingLikeDislike) {
      post.likes.pull(existingLikeDislike._id)
      post.dislikes.pull(existingLikeDislike._id)
    }
    const newLikeDislike = { type: req.body.type, author: userId }
    if (req.body.type === 'Like') {
      post.likes.push(newLikeDislike)
    } else {
      post.dislikes.push(newLikeDislike)
    }
    await post.save()
    res.status(200).json(newLikeDislike)
  } catch (error) {
    res.status(500).json(error)
  }
}
async function deletePost(req, res) {
  try {
    const { communityId, postId } = req.params
    await Post.findByIdAndDelete(postId)
    const community = await Community.findById(communityId)
    community.posts.pull(postId)
    await community.save()
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addReply(req, res) {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    const { content } = req.body
    const author = req.user.profile
    const reply = {
      content,
      author,
    }
    post.replies.push(reply)
    await post.save()
    await post
      .populate({ path: 'replies', populate: { path: 'author' } })
    res.status(201).json(post.replies[post.replies.length - 1])
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function deleteReply(req, res) {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    const replyId = req.params.replyId
    const reply = post.replies.id(replyId)
    reply.remove()
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPostPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const postId = req.params.postId
    const post = await Post.findById(postId)
    const image = await cloudinary.uploader.upload(imageFile, { tags: `${req.user.email}` })
    post.photo = image.url
    await post.save()
    res.status(201).json(post.photo)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

export {
  index,
  getUsersPosts,
  addPost, 
  deletePost, 
  addReply, 
  deleteReply, 
  addLikeOrDislikeToPost, 
  addPostPhoto
}