const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Challenge = require('./Challenge');


const HackathonSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    where: {
        type: String,
        required: true
    },


    startDate: String,
    startTime: String,
    endTime: String,
    endDate: String,
    date: {
        type: Date,
        default: Date.now
    },
    //nested doc
    challenge: [Challenge]
})

const Hackathon = mongoose.model("Hackathons", HackathonSchema)

module.exports = Hackathon;