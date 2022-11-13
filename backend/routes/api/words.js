var router = require("express").Router();
var mongoose = require("mongoose");
var Word = mongoose.model("Word");
var User = mongoose.model("User");
var auth = require("../auth");
const { sendEvent } = require("../../lib/event");
const DEFAULT_IMAGE = "/placeholder.png";

// Preload word objects on routes with ':word'
// router.param("/w/:word", function(req, res, next, slug) {
//     console.log('enters words.word...' + slug);
//
//     Word.findOne({ slug: slug }).exec()
//     .then(function(word) {
//       if (!word) {
//           console.log('words.word not found');
//         return res.sendStatus(404);
//       }
//       else {
//           console.log('words.word  found');
//           console.log(word);
//           res.body= word;
//           return res.send(word);
//       }
//
//     })
//     .catch();
// });
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

//get words query result
router.get("/", auth.required, function(req, res, next) {
    var query = {};
    var limit = 10;
    var offset = 0;

    if (typeof req.query.limit !== "undefined") {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== "undefined") {
        offset = req.query.offset;
    }

    if (typeof req.query.search !== "undefined") {
        query = { title_flat:  {$regex : "^" + req.query.search} };
        console.log('backend request for search: '+ req.query.search);
    }

    if (req.query.search == undefined || req.query.search === ''){
        return res.json({
            words: [],
            wordsCount: 0
        });
    }

    //latency for debugging
    //wait(100);
    return Promise.all([
        Word.find(query)
            .sort({ title_flat: "asc" })
            .limit(Number(limit))
            .skip(Number(offset))
            .exec(),
        Word.count(query).exec()
    ]).then(async function(results) {
        var words = results[0];
        var wordsCount = results[1];
        return res.json({
            words: await Promise.all(
                words.map(async function(word) {
                    word.image = word.image || DEFAULT_IMAGE;
                    return word.toJSON();
                })
            ),
            wordsCount: wordsCount
        });
    })
    .catch(next);
});
router.get("/:word", auth.optional, function(req, res, next) {

    console.log(req.params.word);

        Word.findOne({slug: req.params.word})
            .exec()
            .then(async function(result) {
                return res.send(result);
            })
            .catch(next);
});
router.post("/", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      var word = new Word(req.body.word);

      return word.save().then(function() {
        sendEvent('word_created', { word: req.body.word })
        return res.json({ word: word.toJSONFor(user) });
      });
    })
    .catch(next);
});

// update word
router.put("/:word", auth.required, function(req, res, next) {

      if (typeof req.body.word.title !== "undefined") {
        req.word.title = req.body.word.title;
      }
      //TODO: Add the list of properties
    /*
        slug: { type: String, lowercase: true, unique: true },
        title: String,
        title_flat: String,
        body: String,
        body_flat: String,
        title_english: String,
        subtitles_english: [String],
        image: String,
        created_at: Date
     */

      if (typeof req.body.word.image !== "undefined") {
        req.word.image = req.body.word.image;
      }
      else {
        req.word.image = DEFAULT_IMAGE;
      }

      req.word
        .save()
        .then(function(word) {
          return res.json({ word: word.toJSON() });
        })
        .catch(next);

      return res.sendStatus(304);

});

// delete word
router.delete("/:word", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      if (req.word.seller._id.toString() === req.payload.id.toString()) {
        return req.word.remove().then(function() {
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    })
    .catch(next);
});

module.exports = router;
