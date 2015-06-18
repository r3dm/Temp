import {lerp} from 'interpolation'
import Color from 'color'
import ConvertTemp from './convertTemp.js'

export const splashRed = new Color('#ff5136')
const start = new Color('#7ea4b3')
const end = new Color('#ff5136')
const textColor = new Color('white')
const maxTemp = 100 // resonable temperatures
const minTemp = 0

/*
 * scale our currentTemp to a number between 0 and 1
 */
let scale = function(currentTemp) {

  var numerand = currentTemp - minTemp
  var denominator = maxTemp - minTemp
  var result = numerand / denominator

  // clip to [0, 1]
  result = result > 1 ? 1 : result
  result = result < 0 ? 0 : result

  return result
}

// ensure color has sufficient contrast against text color
let contrast = function(color) {
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
export function weatherColor(currentTemp, units) {
  if(units === 'metric') {
    currentTemp = ConvertTemp.toFahrenheit(currentTemp)
  }
  if(isNaN(currentTemp)) {
    return 'white'
  }

  var result = start.clone()

  var ratio = scale(currentTemp)

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
