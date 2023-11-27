import mongoose from "mongoose";

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  type: {
    type: String,
    enum: ['Like', 'Dislike', 'Comment', 'Reply']
  },
  user: { type: Schema.Types.ObjectId, ref: 'Profile'},
  targetUser: { type: Schema.Types.ObjectId, ref: 'Profile'},
  blog: { type: Schema.Types.ObjectId, ref: 'Blog'},
  post: { type: Schema.Types.ObjectId, ref: 'Community.posts'},
})