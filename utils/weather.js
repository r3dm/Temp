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
  if (isNaN(lat)) {
    return Promise.reject('error: dont hit api with NaN')
  } else {
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
}

/*
 * maps api weather id to and time of day
 * weather-icons names
 */
export function mapWeather(id, night) {
  var lookup = {
    2: 'thunderstorm',
    3: 'sprinkle',
    6: 'snow',
    7: 'day-haze',
    500: 'day-rain',
    501: 'day-rain',
    502: 'rain',
    503: 'rain',
    504: 'rain',
    511: 'rain-mix',
    520: 'rain',
    521: 'rain',
    522: 'rain',
    531: 'rain',
    800: 'day-sunny',
    801: 'day-cloudy',
    802: 'cloud',
    803: 'cloudy',
    804: 'cloudy',
    900: 'tornado',
    901: 'hurricane',
    902: 'hurricane',
    903: 'snowflake-cold',
    904: 'hot',
    905: 'windy',
    951: 'day-sunny',
    952: 'day-windy',
    953: 'day-windy',
    954: 'day-windy',
    955: 'day-windy',
    956: 'strong-wind',
    957: 'strong-wind',
    958: 'strong-wind',
    959: 'strong-wind',
    960: 'strong-wind',
    961: 'hurricane',
    962: 'hurricane'
  }
  var stringify = id + ''
  var series = stringify[0]

  if(lookup[id]) {
    return lookup[id]
  } else {
    return lookup[series]
  }
}
