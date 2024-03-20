import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teamSchema = new Schema({
  teamId: Number,
  name: String,
  logo: String,
  country: String,
  founded: Number,
  venueName: String,
  venueCity: String,
  venueCapacity: Number,
  venueImage: String,
})

const playerSchema = new Schema({
  playerId: Number,
  name: String,
  nationality: String,
  age: Number,
  height: String,
  weight: String,
  injured: Boolean,
  photo: String,
  goals: Number,
  assists: Number,
  teamName: String,
  teamLogo: String,
  appearances: Number,
  position: String,
  keyPasses: Number,
  dribblesAttempted: Number,
  dribblesSucceeded: Number,
  tackles: Number,
  blocks: Number,
  interceptions: Number,
})

const profileSchema = new Schema({
  name: String,
  photo: String,
  interests: [{type: Schema.Types.ObjectId, ref: 'League'}],
  joinedCommunities: [{type: Schema.Types.ObjectId, ref: 'Community'}],
  favoriteTeams: [teamSchema],
  favoritePlayers: [playerSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
