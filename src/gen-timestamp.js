module.exports = function () {
  const d = new Date()

  return `${`${d}`.substr(0, 3)/* Day */} ${`${d}`.substr(4, 6)/* Month */} ${`${d}`.substr(11, 4)/* Year */} ${`${d}`.substr(16, 8)/* Time */} ${`${d}`.substr(25, 8)/* Timezone */}`
}
