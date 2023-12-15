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

const likeDislikeSchema = new Schema({
  type: {
    type: String,
    enum: ['Like', 'Dislike']
  }, 
  author: { type: Schema.Types.ObjectId, ref: 'Profile'}
},
  { timestamps: true }
)

const commentSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  replies: [replySchema],
  likes: [likeDislikeSchema],
  dislikes: [likeDislikeSchema], 
  author: { type: Schema.Types.ObjectId, ref: "Profile"}
},
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

export { Comment }