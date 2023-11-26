import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  interests: [{type: Schema.Types.ObjectId, ref: 'League'}],
  joinedCommunities: [{type: Schema.Types.ObjectId, ref: 'Community'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
