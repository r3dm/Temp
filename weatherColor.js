import request from 'superagent'
import Common from './styles/common.js'
import {lerp} from 'interpolation'

/*
 * takes a temperature and returns an appropriate color
 */
let weatherColor = function(currentTemp) {
  var maxTemp = 100 // resonable temperatures
  var minTemp = 0

  var start = Common.blue
  var end = Common.red
  var result = start.clone()

  var angleDelta = (currentTemp - minTemp) / (maxTemp - minTemp)

  var hueDelta = lerp(start.hue(), end.hue(), angleDelta)
  var saturationDelta = lerp(start.saturation(), end.saturation(), angleDelta)
  var lightnessDelta = lerp(start.lightness(), end.lightness(), angleDelta)

  result.hue(hueDelta)
  result.saturation(saturationDelta)
  result.lightness(lightnessDelta)

  return result.hslString()
}

export default weatherColor
