import mongoose from "mongoose";

const Schema = mongoose.Schema

const leagueSchema = new Schema({
  leagueId: Number,
  name: String,
  logo: String,
  country: String
})

const League = mongoose.model('League', leagueSchema)

export { League } 