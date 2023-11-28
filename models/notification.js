import mongoose from "mongoose";

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  type: {
    type: String,
    enum: ['Like', 'Dislike', 'Comment', 'Reply']
  },
  read : {
    type: Boolean,
    default: false
  },
  user: { type: Schema.Types.ObjectId, ref: 'Profile'},
  targetUser: { type: Schema.Types.ObjectId, ref: 'Profile'},
  blog: { type: Schema.Types.ObjectId, ref: 'Blog'},
  post: { type: Schema.Types.ObjectId, ref: 'Community.posts'},
},
  { 
    timestamps: true,
    expireAfterSeconds: 30 * 24 * 60 * 60
  }
)

notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 })

const Notification = mongoose.model('Notification', notificationSchema)

export { Notification } 