const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv').config();
const router = express.Router();
const apiKey = process.env.API_KEY;

router.get('/search/artists', (req, res) => {
  const params = {
    artistName: req.query.artistName,
    p: req.query.p,
    sort: 'sortName'
  };
  const url = `https://api.setlist.fm/rest/1.0/search/artists?${querystring.stringify(params)}`;
  const config = {
    headers: {
      'Accept': 'application/json',
      'x-api-key': apiKey
    }
  };

  axios.get(url, config)
  .then((response) => {
    console.log(response.data);
    res.json(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.status(error.response.status).json(error.response.data);
  });

});

router.get('/artist/:mbid/setlists', (req, res) => {
  const mbid = req.params.mbid;
  const params = {
    p: req.query.p
  };
  const url = `https://api.setlist.fm/rest/1.0/artist/${mbid}/setlists?${querystring.stringify(params)}`;
  const config = {
    headers: {
      'Accept': 'application/json',
      'x-api-key': apiKey
    }
  };

  axios.get(url, config)
  .then((response) => {
    console.log(response.data);
    res.json(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.status(error.response.status).json(error.response.data);
  });
  
});

module.exports = router;
