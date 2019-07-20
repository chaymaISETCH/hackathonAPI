const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ChallengeSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
   
    solution: {
        type: String,

    },
    difficulty: {
        type: String,
        required: true
    },

    language: {
        type: String,

    },
    tests: {
        type: String,
        required: true
    },
    randomTests: {
        type: String,
        required: true
    },
    initialSolution: {
        type: String,
        required: true
    },
    tags: {
        type: [],

    },
    startDate: String,
    startTime: String,
    endTime: String,
    endDate: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = ChallengeSchema;