var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");
const DEFAULT_IMAGE = "/placeholder.png"

var WordSchema = new mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    title_flat: {
        type: String,
        index: true
    },
    body: String,
    body_flat: String,
    title_english: {
        type: String,
        index: true
    },
    subtitles_english: [String],
    image: String,
    created_at: Date
  },
  { timestamps: true }
);

WordSchema.plugin(uniqueValidator, { message: "is already taken" });

WordSchema.pre("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

WordSchema.methods.slugify = function() {
  this.slug =
    slug(this.title_flat) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};


WordSchema.methods.toJSON = function() {
  return {
    slug: this.slug,
    title: this.title,
    title_flat: this.title_flat,
    body: this.body,
    body_flat: this.body_flat,
    title_english: this.title_english,
    subtitles_english: [this.subtitles_english],
    image: this.image || DEFAULT_IMAGE,
    created_at: this.created_at
  };
};

mongoose.model("Word", WordSchema);
