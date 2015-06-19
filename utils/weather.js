import request from 'superagent'
const urlCurrent = 'http://api.openweathermap.org/data/2.5/weather'
const urlHourly = 'http://api.openweathermap.org/data/2.5/forecast'
const urlDaily = 'http://api.openweathermap.org/data/2.5/forecast/daily'
const mode = 'json'
const cnt = 5

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
          if(err) {
            reject(err)
          }
          resolve(res)
        })
    }),
    new Promise((resolve, reject) => {
      request
        .get(urlHourly)
        .query({ lat, lon, units })
        .end(function(err, res) {
          if(err) {
            reject(err)
          }
          resolve(res)
        })
    }),
    new Promise((resolve, reject) => {
      request
        .get(urlDaily)
        .query({ lat, lon, units, cnt, mode })
        .end(function(err, res) {
          if(err) {
            reject(err)
          }
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
    'Clear': 'day-sunny',
    'Clouds': 'day-sunny',
    'Rain': 'rain'
  }
  return lookup[str]
}

/*
 * maps api weather description (Rain, Snow, Extreme etc.) to
 * human friendly names
 */
export function humanize(str) {
  var lookup = {
    'Clear': 'Clear',
    'Clouds': 'Sunny',
    'Rain': 'Rainy'
  }
  return lookup[str]
}
