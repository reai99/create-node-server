const { MUSIC_REQUEST_URL } = require('../constant');

module.exports = {
  SEARCH_MUSIC: {
    method: 'GET',
    uri: `${MUSIC_REQUEST_URL}/search`,
  },
  SEARCH_HIGHQUALITY_MUSIC: {
    method: 'GET',
    uri: `${MUSIC_REQUEST_URL}/top/playlist/highquality`
  },
  SEARCH_RELATED_MUSIC: {
    method: 'GET',
    uri: `${MUSIC_REQUEST_URL}/related/playlist/related/playlist`,
  },
  SEARCH_HOT_MUSIC_TYPE: {
    method: 'GET',
    uri: `${MUSIC_REQUEST_URL}/playlist/hot`,
  },
}