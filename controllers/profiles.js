import { Profile } from '../models/profile.js'
import { Community } from '../models/community.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    .populate(['interests', 'joinedCommunities'])
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    )
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addLeaguesToInterests(req, res) {
  try {
    const userId = req.params.userId
    const { leagues } = req.body
    const profile = await Profile.findById(userId)
    for (const league of leagues) {
      if (!profile.interests.includes(league)) {
        profile.interests.push(league)
      }
    }
    await profile.save()
    res.status(200).json({ message: 'Leagues added to interests', profile })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function updateInterests(req, res) {
  try {
    const userId = req.params.userId
    console.log(req.body)
    const profile = await Profile.findById(userId)
    profile.interests = req.body.interests
    await profile.save()
    res.status(200).json({ message: 'Interests updated successfully', profile })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function addFavoriteTeamToProfile(req, res) {
  try {
    const userId = req.params.userId
    const { favoriteTeam } = req.body
    const profile = await Profile.findById(userId)

    const isAlreadyAdded = profile.favoriteTeams.some(team => team.teamId === favoriteTeam.teamId)
    if (isAlreadyAdded) {
      return res.status(400).json({ message: 'Team already added to favorites' })
    }

    profile.favoriteTeams.push(favoriteTeam)

    let existingCommunity = await Community.findOne({ teamId: favoriteTeam.teamId })
    if (!existingCommunity) {
      const newCommunity = new Community({
        teamId: favoriteTeam.teamId,
        teamName: favoriteTeam.name,
      })
      existingCommunity = await newCommunity.save()
    }

    profile.joinedCommunities.push(existingCommunity._id)
    await profile.save()

    existingCommunity.communityMembers.push(profile._id)
    await existingCommunity.save()

    res.status(200).json({ message: 'Team added to favorites', profile })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}


async function addFavoritePlayerToProfile(req, res) {
  try {
    const userId = req.params.userId
    const { favoritePlayer } = req.body
    const profile = await Profile.findById(userId)
    const isAlreadyAdded = profile.favoritePlayers.some(player => player.playerId === favoritePlayer.playerId)
    if (isAlreadyAdded) {
      return res.status(400).json({ message: 'Player already added to favorites' })
    }

    profile.favoritePlayers.push(favoritePlayer)
    await profile.save()
    res.status(200).json({ message: 'Player added to favorites', profile })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}



export { index, addPhoto, update, addLeaguesToInterests, show, updateInterests, addFavoriteTeamToProfile, addFavoritePlayerToProfile }
