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

export {
  index,
  joinCommunity,
  create,
  deleteCommunity
}