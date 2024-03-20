import mongoose from "mongoose";

const Schema = mongoose.Schema

const communitySchema = new Schema({
  teamId: { 
    type: Number,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
  communityMembers: [{ type: Schema.Types.ObjectId, ref: 'Profile'}]
})


const Community = mongoose.model('Community', communitySchema)

export { Community }


