class ConvertTemp {
  toFahrenheit(num) {
    return Math.round((num * (9 / 5)) + 32)
  }

  toCelsius(num) {
    return Math.round((num - 32) * (5 / 9))
  }

  /* converts given number to target units
   * e.g. convertUnits(0, 'imperial') = 32
   */
  convertUnits(num, unit) {
    if (unit === 'metric') {
      return this.toCelsius(num)
    } else if (unit === 'imperial') {
      return this.toFahrenheit(num)
    } else {
      throw 'error - unknown unit type ' + unit
    }
  }
}

export default new ConvertTemp()
