global.fetch = require('node-fetch');

const Unsplash = require("unsplash-js").default;
const toJson = require('unsplash-js').toJson;
const config = require("universal-config");

const express = require("express");

const unsplash = new Unsplash({
  applicationId: config.get('ACCESS_KEY'),
  secret: config.get('SECRET_KEY'),
  callbackUrl: config.get('CALLBACK_URL')
});

const app = express();

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(json => {
      res.json(json);
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening to server at port ${PORT}`);
})