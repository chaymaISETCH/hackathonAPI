const mongoose = require("mongoose")
const Schema = mongoose.Schema


const TeamSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        default: "user"
    },
    leader: {
        type: String,
        required: true
    },
    members: [],
    invitations: [],
    date: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    },
    //3:accepted,2: waiting for response
    status: {
        type: Number,
        default: 2
    }
})

const Team = mongoose.model("teams", TeamSchema)

module.exports = Team;