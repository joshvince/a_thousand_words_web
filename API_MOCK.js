const express = require('express')
const app = express()

// TEMPORARILY ALLOW CORS IN DEV

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    image: "",
    location: {
      coordinates: [51.51124190491075, -0.11714594729244254]
    }
  },
  {
    year: 2009,
    name: "The Next Episode",
    description: "Aayeehaayeehh",
    image: "",
    location: {
      coordinates: [51.51137878750785, -0.12079375155269645]
    }
  }
]
app.get('/api/pictures', function (req, res) {
  res.json(PICTURES)
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})