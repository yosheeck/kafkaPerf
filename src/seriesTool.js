const { performance } = require('perf_hooks')

const trimPrecision = (x) => x.toFixed(2)

class SeriesTool {
  constructor (id) {
    this.id = id
    this.delayedDisplayTriggered = false
    this.clear()
  }

  addDatapoint (x) {
    this.dataPoints.push({
      time: performance.now(),
      value: x
    })
    this.triggerDisplay()
  }

  clear() {
      this.dataPoints = []
  }

  getStats () {
    const firstPoint = this.dataPoints[0]
    const lastPoint = this.dataPoints[this.dataPoints.length - 1]

    const stats = {
      sum: 0,
      cnt: 0
    }
    this.dataPoints.forEach((point) => {
      stats.sum += point.value
      stats.cnt++
    })
    stats.avg = stats.sum / stats.cnt
    stats.timeFromStart = lastPoint.time - firstPoint.time

    return stats
  }

  displayStats () {
    const stats = this.getStats()
    const avg = trimPrecision(stats.avg)
    const timeFromStart = trimPrecision(stats.timeFromStart)
    const lastPoint = this.dataPoints[this.dataPoints.length - 1]
    console.log(`Series ${this.id} sum:${stats.sum} cnt:${stats.cnt} avg:${avg} last:${lastPoint.value} in ${timeFromStart}ms`)
  }

  getValuesArray() {
    return this.dataPoints.map((x) => x.value)
  }

  triggerDisplay () {
    if (!this.delayedDisplayTriggered) {
      this.delayedDisplayTriggered = true
      setTimeout(() => {
        this.delayedDisplayTriggered = false
        this.displayStats()
      },
      800
      )
    }
  }
}

module.exports = {
  SeriesTool
}