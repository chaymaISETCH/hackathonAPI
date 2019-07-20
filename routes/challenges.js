const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Hackathon = require("../models/Hackathon")

const Challenge = require("../models/Challenge")
var cors = require('cors')



//private route
router.post('/addChallenge/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Hackathon.findById(req.params.id, function (err, hackathon) {
        if (err) console.log(err)
        hackathon.challenge.push({ ...req.body })
        hackathon.save(function (err, doc) {
            if (err) console.log(err, doc)

            return res.status(200).json({
                id: doc._id
            });
        });

    });

})

//private route
router.put('/editChallenge/:id/:hackathonId', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)

    /* Hackathon.findById(
         { "_id": req.params.hackathonId, "challenge._id": req.params.id },
 
         function (err, doc) {
             if (err) console.log(err)
             console.log('Success!', doc);
             return res.status(200).json({
                 success: 'Success!'
             });
         }
     );*/
    Hackathon.findOneAndUpdate(
        { "_id": req.params.hackathonId, "challenge._id": req.params.id },
        {
            "$set": {
                "challenge.$": { ...req.body }
            }
        },
        function (err, doc) {
            if (err) console.log(err)
            console.log('Success!', doc);
            return res.status(200).json({
                success: 'Success!'
            });
        }
    );




})


//private route
router.delete("/deleteChallenge/:id/:hackathonId", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params.id, req.params.hackathonId)


    Hackathon.findById(req.params.hackathonId, function (err, hackathon) {
        if (err) console.log(err)
        hackathon.challenge.id(req.params.id).remove();
        hackathon.save(function (err) {
            if (err) console.log(err)
            console.log('Success!');
            return res.status(200).json({
                success: 'Success!'
            });
        });

    });






})

module.exports = router;