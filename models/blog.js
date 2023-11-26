import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String, 
    required: true
  },
  author: { type: Schema.Types.ObjectId, ref: "Profile"}
},
  { timestamps: true }
)

const likeDislikeSchema = new Schema({
  type: {
    type: String,
    enum: ['Like', 'Dislike']
  }, 
  author: { type: Schema.Types.ObjectId, ref: "Profile"}
},
  { timestamps: true }
)

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  league: { type: Schema.Types.ObjectId, ref: 'League'},
  author: { type: Schema.Types.ObjectId, ref: 'Profile'},
  likes: [likeDislikeSchema],
  dislikes: [likeDislikeSchema],
  photo: {
    type: String,
    required: true
  }
},
  { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema)

export { Blog }