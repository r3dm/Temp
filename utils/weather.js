import request from 'superagent'
const urlCurrent = 'http://api.openweathermap.org/data/2.5/weather'
const url5day = 'http://api.openweathermap.org/data/2.5/forecast'

/*
 * fetches weather from api. Returns a Promise object.
 * we initiate two ajax requests in parallel as an optimization
 * returns an array of json responses
 */
export function fetchWeather(lat, lon, units) {
  return Promise.all([
    new Promise((resolve, reject) => {
      request
        .get(urlCurrent)
        .query({ lat, lon, units })
        .end(function(err, res) {
          if(err)
            reject(err)
          resolve(res)
        })
    }),
    new Promise((resolve, reject) => {
      request
        .get(url5day)
        .query({ lat, lon, units })
        .end(function(err, res) {
          if(err)
            reject(err)
          resolve(res)
        })
    })
  ])
}

/*
 * maps api weather description (Rain, Snow, Extreme etc.) to
 * weather-icons names
 */
export function mapWeather(str) {
  var lookup = {
    'Rain': 'rain',
    'Clouds': 'day-sunny'
  }
  return lookup[str]
}

/*
 * maps api weather description (Rain, Snow, Extreme etc.) to
 * human friendly names
 */
export function humanize(str) {
  var lookup = {
    'Rain': 'Rainy',
    'Clouds': 'Sunny'
  }
  return lookup[str]
}
