# Dictionary Backend

The Dictionary backend is Node web app written with [Express](https://expressjs.com/)

## Dependencies

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - Modeling and mapping MongoDB data
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - Handling validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- [passport](https://github.com/jaredhanson/passport) - User authentication
- [slug](https://github.com/dodo/node-slug) - Encoding titles into a URL format

## App Structure

- `app.js` - The entry point.
- `config/` - Configuration for passport + configuration/environment variables.
- `routes/` - Route definitions for API.
- `models/` - Mongoose schema definitions.

## Errors

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand](https://github.com/gothinkster/realworld/blob/master/API.md#errors-and-status-codes)

## Deployment

Heroku instructions: https://devcenter.heroku.com/articles/git#for-an-existing-app

Heroku can receive only the backend folder: https://github.com/timanovsky/subdir-heroku-buildpack

Define a heroku secret:
`heroku config:set SECRET=mysecret --app dictionary-api`

To push:
`git push heroku main`