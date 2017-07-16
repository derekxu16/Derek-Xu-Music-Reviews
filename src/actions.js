import Spotify from 'spotify-web-api-js' 
import fetch from 'isomorphic-fetch'

var spotify = new Spotify()

function receiveToken(token) {
    spotify.setAccessToken(token)
    return {
        type : "RECEIVE_TOKEN",
        token: token
    }
}

function requestArtist() {}

function requestAlbum(id) {
    return {
        type: "REQUEST_ALBUM",
        id
    }
}

function receiveAlbum(id, json) {
    console.log(json)
    return {
        type: "RECEIVE_ALBUM",
        id,
        data : {
            artists: json.artists,
            images: json.images,
            name: json.name,
            releaseDate: json.release_date,
            label : json.label,
            tracks : json.tracks,
            link: json.external_urls.spotify
        }
    }
}

function fetchArtist() {}

export function fetchToken() {
    // return dispatch => fetch('http://127.0.0.1:5000/authSpotify') LOCAL
    return dispatch => fetch('https://plumsauce.pythonanywhere.com/authSpotify') //PRODUCTION
     .then((response) => response.json())
      .then(json => dispatch(receiveToken(json.access_token)))
}

export function fetchAlbum(id) {
    return function(dispatch) {
        dispatch(requestAlbum(id))
        return spotify.getAlbum(id)
        .then(response =>
            dispatch(receiveAlbum(id, response))
        )
    }
}