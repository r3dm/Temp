import request from 'superagent'
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather'

let Weather = function(callback) {
  request
    .get(weatherUrl)
    .query({
      lat: 37.7587,
      lon: -122.3951,
      units: 'imperial'
    })
    .end(function(err, res) {
      console.log('response', res)
      callback(res)
    })
}

export default Weather
