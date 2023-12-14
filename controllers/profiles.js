import { Profile } from '../models/profile.js'
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
    const { interests } = req.body
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




export { index, addPhoto, addLeaguesToInterests, show, updateInterests }
