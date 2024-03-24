import { Profile } from '../models/profile.js'
import { Community } from '../models/community.js'
import { League } from '../models/league.js'
import { v2 as cloudinary } from 'cloudinary'
import * as soccerApiMiddleware from '../config/helper.js'

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
    const profile = await Profile.findById(userId)
      .populate('interests')
    console.log(req.body)
    const isAlreadyAdded = profile.interests.some(league => league.leagueId === req.body.leagueId)
    if (isAlreadyAdded) {
      return res.status(400).json({ message: 'League already added to favorites' })
    }

    let existingLeague = await League.findOne({ leagueId: req.body.leagueId })
    if (!existingLeague) {
      const newLeague = new League(req.body)
      existingLeague = await newLeague.save()
    }

    profile.interests.push(existingLeague._id)
    await profile.save()

    await existingLeague.save()

    res.status(200).json({ message: 'League added to favorites', profile })
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
    const profile = await Profile.findById(userId)
    const isAlreadyAdded = profile.favoriteTeams.some(team => team.teamId === req.body.teamId)
    if (isAlreadyAdded) {
      return res.status(400).json({ message: 'Team already added to favorites' })
    }

    profile.favoriteTeams.push(req.body)

    let existingCommunity = await Community.findOne({ teamId: req.body.teamId })
    if (!existingCommunity) {
      const newCommunity = new Community({
        teamId: req.body.teamId,
        teamName: req.body.name,
        logo: req.body.logo
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
    const profile = await Profile.findById(userId)
    const isAlreadyAdded = profile.favoritePlayers.some(player => player.playerId === req.body.playerId)
    if (isAlreadyAdded) {
      return res.status(400).json({ message: 'Player already added to favorites' })
    }

    profile.favoritePlayers.push(req.body)
    await profile.save()
    res.status(200).json({ message: 'Player added to favorites', profile })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function getTeamInformation(req, res) {
  try {
    const teamName = req.body.teamName
    const teamInfo = await soccerApiMiddleware.getTeamInfo(teamName)
    res.status(201).json(teamInfo)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getPlayerInfoByName(req, res) {
  try {
    const playerName = req.body.playerName
    const teamId = req.params.teamId
    const year = req.params.year
    const playerData = await soccerApiMiddleware.getPlayerInformationByName(teamId, year, playerName)
    res.status(200).json(playerData)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getPlayerInfoById(req, res) {
  try {
    const playerId = req.params.playerId
    const teamId = req.params.teamId
    const year = req.params.year
    const playerData = await soccerApiMiddleware.getPlayerInformationById(teamId, year, playerId)
    res.status(200).json(playerData)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getUpcomingFixtureForFavoriteTeams(req, res) {
try {
  const fixture = await soccerApiMiddleware.getUpcomingFixtureForFavoriteTeam(req.params.teamId)
  res.status(201).json(fixture)
} catch (error) {
  res.status(500).json(error)
}
}

export { index, addPhoto, update, addLeaguesToInterests, show, updateInterests, addFavoriteTeamToProfile, addFavoritePlayerToProfile, getTeamInformation, getUpcomingFixtureForFavoriteTeams, getPlayerInfoByName, getPlayerInfoById }
