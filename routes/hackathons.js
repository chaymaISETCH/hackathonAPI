const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Hackathon = require("../models/Hackathon")
var cors = require('cors')

//public route
router.get('/', function (req, res) {


    Hackathon.find({
    }).then(hackathons => {
        return res.status(200).json({
            hackathons
        });
    }).catch(error => res.json({
        error
    }))
})

//private route
router.post('/addHackathon', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const newHackathon = new Hackathon({ ...req.body })
    newHackathon.save({
    }).then(hackathon => {

        res.send({ _id: hackathon._id })
    }).catch(error => res.json({
        error
    }))
})

//private route
router.put('/editHackathon/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const newHackathon = new Hackathon({ ...req.body })
    Hackathon.findByIdAndUpdate(
        req.params.id,
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        (err, hackathon) => {
            // Handle any possible database errors
            if (err) return res.send(err);
            return res.send(Hackathon);
        }
    )

})

//private route
router.post('/addHackathon', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const newHackathon = new Hackathon({ ...req.body })
    newHackathon.save({
    }).then(hackathon => {

        res.send({ ok: "ok" })
    }).catch(error => res.json({
        error
    }))
})

//private route
router.delete("/deleteHackathon/:id", passport.authenticate('jwt', { session: false }), (req, result) => {
    console.log(req.params.id)
    Hackathon.deleteOne({ _id: req.params.id }, function (Hackathon, err) {
        if (err) result.json(err);
        else result.json(Hackathon)
    });



})

module.exports = router;