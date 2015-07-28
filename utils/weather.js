import request from 'superagent'
const urlCurrent = 'http://api.openweathermap.org/data/2.5/weather'
const urlHourly = 'http://api.openweathermap.org/data/2.5/forecast'
const urlDaily = 'http://api.openweathermap.org/data/2.5/forecast/daily'
const mode = 'json'
const cnt = 5
const type = 'accurate'

/*
 * fetches weather from api. Returns a Promise object.
 * we initiate two ajax requests in parallel as an optimization
 * returns an array of json responses
 */
function fetchWeatherFromAPI(lat, lon, units) {
  if (isNaN(lat)) {
    return Promise.reject('error: dont hit api with NaN')
  } else {
    return Promise.all([
      new Promise((resolve, reject) => {
        request
          .get(urlCurrent)
          .query({ lat, lon, units, type })
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
          .query({ lat, lon, units, type })
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
          .query({ lat, lon, units, cnt, mode, type })
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
    500: 'sprinkle',
    501: 'sprinkle',
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


// request geolocation data from browser
// pass latitude/longitude to openweathermap.org api
// returns promise for new state
export function fetchWeather() {
  if(navigator.geolocation) {
    var promise = new Promise((resolve) => {
      console.log('browser supports geolocation, waiting for user')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('browser gps given', position)
          var result = fetchWeatherFromAPI(position.coords.latitude,
                                    position.coords.longitude,
                                    'imperial')
                          .then(weatherCallback, fetchWeatherError)
          result.lat = position.coords.latitude
          result.lon = position.coords.longitude
          console.log('return value', result)

          resolve(result)
         }
      )
    })
    return promise
  } else {
    console.log('no geolocation available')
  }
}

// used for weather api callbacks, parses the raw response into the fields
// we want
function weatherCallback(results) {
  console.log('response:', results)
  var weather = results[0].body
  var hourlyForecast = results[1].body.list
  var fiveDayForecast = results[2].body.list

  // weather api may return an array here, so we check
  var currentWeather = Array.isArray(weather.weather) ?
                  weather.weather[0] :
                  weather.weather
  return {
    weather,
    hourlyForecast,
    fiveDayForecast,
    temp: Math.round(weather.main.temp),
    timestamp: Date.now(),
    cityName: weather.name,
    sunrise: weather.sys.sunrise,
    sunset: weather.sys.sunset,
    currentConditions: currentWeather.main,
    country: weather.sys.country
  }
}

function fetchWeatherError(reason) {
  console.log(reason)
}
