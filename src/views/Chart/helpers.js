/** @format */

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateData(iterations = 100, defaultValues = [], namePrefix = {}, maxJump = 100) {
  const arr = []
  for (let i = 0; i <= iterations; i++) {
    const values = defaultValues.map((v, idx) => {
      if (i === 0 && typeof v.value === 'number') {
        return v
      }
      return {
        ...v,
        value: i === 0 ? this.getRandomNumber(1, 1000) : arr[i - 1].values[idx].value + this.getRandomNumber(0, maxJump)
      }
    })
    arr.push({
      name: `${namePrefix.prefix || ''} ${(namePrefix.initialValue || 0) + i}`,
      values
    })
  }
  return arr
}

export default {
  getRandomNumber,
  generateData
}
