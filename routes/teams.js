const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Team = require("../models/Team")
var cors = require('cors')

//private route
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {


    Team.find({
    }).then(teams => {
        return res.status(200).json({
            teams
        });
    }).catch(error => res.json({
        error
    }))
})
//private route
router.get('/getTeamsBySchool', passport.authenticate('jwt', { session: false }), function (req, res) {


    Team.find({
        "school": req.user.school, email: { $ne: req.user.email }

    }).then(teams => {
        return res.status(200).json({
            teams
        });
    }).catch(error => res.json({
        error
    }))
})
//private route
router.post('/createTeam', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const newTeam = new Team({ ...req.body, leader: req.user._id, school: req.user.school })
    newTeam.save({
    }).then(team => {

        res.send({ team })
    }).catch(error => res.json({
        error
    }))
})
//private route
router.put('/invite/:teamId', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    Team.findById(req.params.teamId, function (err, team) {
        if (err) console.log(err)
        let exists = false
        team.invitations.map(el => {
            if (el._id === req.body._id) {
                console.log("already exists !!")
                exists = true;

            }
        })
        if (!exists) {
            team.invitations.push({ ...req.body })
            team.save(function (err, doc) {
                if (err) {
                    console.log(err, doc)
                    return res.status(400).json({
                        err
                    });
                }

                return res.json({
                    id: doc
                });
            });
        }
        else
        return res.json({
            msg: "already exists !!"
        });

    });
})
//private route
router.put('/editTeam/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    const newTeam = new Team({ ...req.body })
    Team.findByIdAndUpdate(
        req.params.id,
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        (err, team) => {
            // Handle any possible database errors
            if (err) return res.send(err);
            return res.send(team);
        }
    )

})


//private route
router.delete("/deleteTeam/:id", passport.authenticate('jwt', { session: false }), (req, result) => {
    console.log(req.params.id)
    Team.deleteOne({ _id: req.params.id }, function (team, err) {
        if (err) result.json(err);
        else result.json(team)
    });



})

module.exports = router;