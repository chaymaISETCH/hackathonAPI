const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    },
    invitations: [],
    submittedCode: [
        {
            code: {
                type: String,
                required: true
            },
            status: {
                type: Number,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            challengeId: { type: Schema.Types.ObjectId, required: true },
            hackathonId: { type: Schema.Types.ObjectId, required: true },

        }
    ]
})

const User = mongoose.model("users", UserSchema)

module.exports = User;