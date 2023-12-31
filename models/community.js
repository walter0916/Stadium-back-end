import mongoose from "mongoose";

const Schema = mongoose.Schema

const communitySchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
  communityMembers: [{ type: Schema.Types.ObjectId, ref: 'Profile'}]
})


const Community = mongoose.model('Community', communitySchema)

export { Community }


