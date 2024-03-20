import mongoose from "mongoose";

const Schema = mongoose.Schema

const leagueSchema = new Schema({
  leagueData: [Object]
})

const League = mongoose.model('League', leagueSchema)

export { League } 