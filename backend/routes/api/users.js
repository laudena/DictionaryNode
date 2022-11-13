var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var User = mongoose.model("User");
var auth = require("../auth");
const { sendEvent } = require("../../lib/event");
const ADMIN_REQUIRED = "Unauthorized by this user";

router.get("/user", auth.required, function(req, res, next) {
    //retrieve the user from the signed token data.
    User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.put("/user", auth.required, function(req, res, next) {

  //user update it's own data
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== "undefined") {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== "undefined") {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.password !== "undefined") {
        user.setPassword(req.body.user.password);
      }
      if (typeof req.body.user.role !== "undefined") {
          user.role = req.body.user.role;
      }

      return user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
});


router.put("/user/password", auth.required, function(req, res, next) {
    //update any user password (admins only)
    if (req.payload.role !== 'admin')
        return res.status(401).jsonp({errors : [ADMIN_REQUIRED] });

    User.findOne({email : req.body.user.email})
        .then(function(user) {
            console.log(user);
            console.log(req.body.user);
            if (!user) {
                return res.sendStatus(401);
            }

            // only update fields that were actually passed...
            if (typeof req.body.user.username !== "undefined") {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.password !== "undefined") {
                user.setPassword(req.body.user.password);
            }
            if (typeof req.body.user.role !== "undefined") {
                user.role = req.body.user.role;
            }

            return User.findOneAndUpdate({email : req.body.user.email}, user).then(function() {
                return res.json({ user: user.toAuthJSON() });
            });
        })
        .catch(next);
});

router.get("/users/login", auth.required, function(req, res, next) {
    //retrieve authenticated user data
    return res.json({ user: req.payload });
});

router.post("/users/login", function(req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post("/users", auth.required, function(req, res, next) {
    //admins only
  if (req.payload.role !== 'admin')
      return res.status(401).jsonp({errors : [ADMIN_REQUIRED] });

  //create a new user
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.role = req.body.user.role ? req.body.user.role : 'user';

      user
    .save()
    .then(function() {
      sendEvent('user_created', { username: req.body.user.username })
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

module.exports = router;
