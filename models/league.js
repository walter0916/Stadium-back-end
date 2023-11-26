import mongoose from "mongoose";

const Schema = mongoose.Schema

const leagueSchema = new Schema({
  leagueName: String
})

const League = mongoose.model('League', leagueSchema)

export { League } 