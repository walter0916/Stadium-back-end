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

const postSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  replies: [replySchema],
  likes: [likeDislikeSchema],
  dislikes: [likeDislikeSchema], 
  author: { type: Schema.Types.ObjectId, ref: 'Profile'},
  photo: String
},
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export { Post }