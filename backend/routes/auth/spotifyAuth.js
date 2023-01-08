const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv').config();
const router = express.Router();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

router.get('/login', (req, res) => {
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: 'playlist-modify-public playlist-modify-private playlist-read-private',
    redirect_uri: redirectUri
  };

  res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify(params)}`);
});

router.get('/callback', (req, res) => {
  const code = req.query.code;
  const url = 'https://accounts.spotify.com/api/token';
  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    }
  };

  axios.post(url, data, config)
  .then((response) => {
    console.log(response.data);
    res.json(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.status(error.response.status).json(error.response.data);
  });

});

router.get('/refresh_token', (req, res) => {
  const refreshToken = req.query.refresh_token;
  const url = 'https://accounts.spotify.com/api/token';
  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    }
  };
  
  axios.post(url, data, config)
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
