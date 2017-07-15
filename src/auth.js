var request = require('request');

var client_id = '0ea8c3cb0efd4cc2b135416f49dd3105'; // Your client id
var client_secret = '5b3bd0cf3a1e4a96ad1706bd3c140d1e'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

export default function() {
    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        console.log(token)
    }
})
};