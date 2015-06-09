import Common from './styles/common.js'
import {lerp} from 'interpolation'
import Color from 'color'

/*
 * scale our currentTemp to a number between 0 and 1
 */
let scale = function(currentTemp) {
  const maxTemp = 100 // resonable temperatures
  const minTemp = 0

  var numerand    = currentTemp - minTemp
  var denominator = maxTemp - minTemp
  var result = numerand / denominator

  // clip to [0, 1]
  result = result > 1 ? 1 : result
  result = result < 0 ? 0 : result

  return result
}

// ensure color has sufficient contrast against text color
let contrast = function(color) {
  const textColor = Color('white')

  while(color.contrast(textColor) < 2) {
    color = color.darken(0.1)
  }
}

/*
 * Takes a temperature and returns an appropriate color
 * in hsl you can modify by hue, saturation and lightness, so
 * we calculate a color between 'blue' & 'red' by Linear Interpolation
 * ex. lerp(start, end, ratio)
 */
let weatherColor = function(currentTemp) {
  var start = Common.blue
  var end = Common.red
  var result = start.clone()

  var ratio  = scale(currentTemp)

  var newHue = lerp(start.hue(), end.hue(), ratio)
  var newSaturation = lerp(start.saturation(), end.saturation(), ratio)
  var newLightness = lerp(start.lightness(), end.lightness(), ratio)

  result.hue(newHue)
  result.saturation(newSaturation)
  result.lightness(newLightness)
  contrast(result)
  // result.alpha(0.3)

  return result.hslaString()
}

export default weatherColor
