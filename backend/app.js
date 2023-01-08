const express = require('express');
const cors = require('cors');
const spotifyAuth = require('./routes/auth/spotifyAuth');
const setlistFmApi = require('./routes/api/setlistFmApi');
const spotifyApi = require('./routes/api/spotifyApi');
const app = express();
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(express.json());
app.use('/', cors(corsOptions), spotifyAuth);
app.use('/api/', cors(corsOptions), setlistFmApi);
app.use('/api/', cors(corsOptions), spotifyApi);

app.listen(port, () => {
  console.log(`Port : ${port}`);
});
