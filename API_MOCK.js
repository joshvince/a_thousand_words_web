const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // TEMPORARILY ALLOW CORS IN DEV

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api', function (req, res) {
  res.send('HI THERE YOU HIT THE API')
})

// test picture data
var PICTURES = [
  {
    year: 2010,
    name: "My first pic",
    description: "something descripty",
    image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/09/12/22/Gary_Busey.jpg",
    location: {
      coordinates: [51.51124190491075, -0.11714594729244254]
    }
  },
  {
    year: 2009,
    name: "The Next Episode",
    description: "Aayeehaayeehh",
    image: "https://pursuit.ca/wp-content/uploads/2013/01/72014-actor-gary-busey-arrives-at-the-80th-annual-academy-awards-in-hollywoo.jpg",
    location: {
      coordinates: [51.51137878750785, -0.12079375155269645]
    }
  }
]
app.get('/api/pictures', function (req, res) {
  res.json(PICTURES)
})

// right now, just send back the first fake picture
app.post('/api/pictures/new', function(req, res) {
  res.send(PICTURES[0])
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})