import mongoose from "mongoose";

const Schema = mongoose.Schema

const replySchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
},
  { timestamps: true }
)

const commentSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  replies: [replySchema],
  author: { type: Schema.Types.ObjectId, ref: "Profile"}
},
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

export { Comment }