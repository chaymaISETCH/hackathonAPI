const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

router.post('/register', function (req, res) {
    console.log(req.body)
    const errors = false
    const isValid = true

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.json({
                email: 'Email already exists'
            });
        }
        else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                school: req.body.password

            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, match) {
                    if (match) {
                        console.log("match")
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,

                            points: user.points || 0,

                        }
                        jwt.sign(payload, 'secret', (err, token) => {
                            console.log("here")
                            if (err) console.error('There is some error in token', err);

                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });

                        });




                    } else {
                        console.log("Passwords don't match")
                        return res.status(400).json({ success: false, password: "error" });

                    }
                });
            }
            else {
                res.status(400).json({ success: false, email: "error" })

            }
        })
});

router.post('/submit', passport.authenticate('jwt', { session: false }), (req, res) => {

    console.log(req.body)
    let submit = {}
    User.findById(req.user.id, function (err, user) {
        if (err) console.log(err)
        user.submittedCode.push({ ...req.body })
        user.save(function (err, doc) {
            if (err) console.log(err, doc)

            submit = doc
        });
        //add points
        if (req.body.status === 3) {
            console.log("here")
            User.findOneAndUpdate(
                { "_id": req.user.id },
                {
                    "$set": {
                        "points": Number(user.points) + 50
                    }
                },
                function (err, doc) {
                    if (err) console.log(err)
                    console.log('Success!', doc);
                    return res.status(200).json({
                        ...submit, doc
                    });
                }
            );
        }
        else
            return res.status(200).json({
                ...submit
            });

    });


});


router.get('/usersBySchool', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user.school)
    User.find(
        { "school": req.user.school, email: { $ne: req.user.email } }, 'name email points school',
        function (err, users) {
            if (err) console.log(err)
            console.log('Success!', users);
            return res.status(200).json({
                users
            });
        }
    );

});
//private route
router.put('/invite/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    User.findById(req.params.id, function (err, user) {
        if (err) console.log(err)
        let exists = false
        user.invitations ? user.invitations.map(el => {
            if (el._id === req.body._id) {
                console.log("already exists !!")
                exists = true;

            }
        }) : null
        if (!exists) {

            user.invitations.push({ ...req.body })
            user.save(function (err, doc) {
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


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {

    console.log(req)
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;