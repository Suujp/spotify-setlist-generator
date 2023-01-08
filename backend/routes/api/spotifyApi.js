const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv').config();
const router = express.Router();

router.get('/search', (req, res) => {
  const params = {
    q: req.query.q,
    type: req.query.type,
    limit: req.query.limit
  };
  const url = `https://api.spotify.com/v1/search?${querystring.stringify(params)}`;
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.header('Authorization')
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

router.get('/me', (req, res) => {
  const url = 'https://api.spotify.com/v1/me';
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.header('Authorization')
    }
  };

  axios.get(url, config)
  .then((response) => {
    console.log(response);
    res.json(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.status(error.response.status).json(error.response.data);
  });

});

router.post('/users/:user_id/playlists', (req, res) => {
  const userId = req.params.user_id;
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = req.body;
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.header('Authorization')
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

router.post('/playlists/:playlist_id/tracks', (req, res) => {
  const playlistId = req.params.playlist_id;
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const data = req.body;
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.header('Authorization')
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

router.get('/me/playlists', (req, res) => {
  const url = 'https://api.spotify.com/v1/me/playlists';
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.header('Authorization')
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
