import { Community } from "../models/community.js";
import { Profile } from "../models/profile.js";

async function index(req,res) {
  try {
    const communities = await Community.find({})
      .populate(['posts','communityMembers'])
    res.status(200).json(communities)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function joinCommunity(req, res) {
  try {
    const communityId = req.params.communityId
    const userId = req.user.profile
    const community = await Community.findById(communityId)
    if (community.communityMembers.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member of the community' })
    }
    community.communityMembers.push(userId)
    await community.save()
    await Profile.findByIdAndUpdate(
      userId,
      { $push: { joinedCommunities: communityId } },
      { new: true }
    )
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const communityId = req.params.communityId;
    const community = await Community.findById(communityId)
    .populate({
      path: 'posts',
      populate: {
        path: 'author',
        model: 'Profile',
      },
      populate: {
        path: 'replies',
        populate: {
          path: 'author',
          model: 'Profile',
        }
      }
    })
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}


async function create(req, res) {
  try {
    const { teamName } = req.body
    const userId = req.user.profile
    const community = await Community.create({ teamName })
    community.communityMembers.push(userId)
    await community.save()
    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { $push: { joinedCommunities: community._id } },
      { new: true } 
    )
    res.status(201).json({ community, userProfile: updatedProfile })
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteCommunity(req, res) {
  try {
    const community = await Community.findByIdAndDelete(req.params.communityId)
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPost(req, res) {
  try {
    const community = await Community.findById(req.params.communityId)
    req.body.author = req.user.profile
    community.posts.push(req.body)
    await community.save()
    const newPost = community.posts[community.posts.length - 1]
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addLikeOrDislikeToPost(req, res) {
  try {
    const communityId = req.params.communityId
    const postId = req.params.postId
    const userId = req.user.profile
    const community = await Community.findById(communityId)
    const post = community.posts.id(postId)
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
    await community.save()
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deletePost(req, res) {
  try {
    const community = await Community.findById(req.params.communityId)
    community.posts.remove({ _id: req.params.postId })
    await community.save()
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addReply(req, res) {
  try {
    const community = await Community.findById(req.params.communityId);
    const postId = req.params.postId
    const post = community.posts.id(postId)
    const { content } = req.body;
    const author = req.user.profile;
    const reply = {
      content,
      author,
    }
    post.replies.push(reply)
    await community.save()
    const newReply = post.replies[post.replies.length - 1]
    res.status(201).json(newReply)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function deleteReply(req, res) {
  try {
    const community = await Community.findById(req.params.communityId)
    const postId = req.params.postId
    const post = blog.comments.id(postId)
    const replyId = req.params.replyId
    const reply = post.replies.id(replyId)
    reply.remove()
    await community.save()
    res.status(200).json(community)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPostPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const communityId = req.params.communityId
    const postId = req.params.postId
    const community = await Community.findById(communityId)
    const post = community.posts.id(postId)
    const image = await cloudinary.uploader.upload(imageFile, { tags: `${req.user.email}` })
    post.photo = image.url
    await community.save()
    res.status(201).json(post.photo)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}


export {
  index,
  joinCommunity,
  create,
  deleteCommunity,
  show,
  addPost,
  addLikeOrDislikeToPost,
  deletePost,
  addReply,
  deleteReply,
  addPostPhoto
}