/* eslint-disable no-useless-escape */
const fs = require('fs')
const data = require('../scores.json')
const book = require('../addressbook.json')
const transaction = require('../assignations.json')

const scientificToDecimal = input => {
  const nsign = Math.sign(input)
  // remove the sign
  let num = Math.abs(input)
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    const zero = '0'
    const parts = String(num)
      .toLowerCase()
      .split('e') // split into coeff and exponent
    const e = parts.pop() // store the exponential part
    let l = Math.abs(e) // get the number of zeros
    const sign = e / l
    const coeffArray = parts[0].split('.')
    if (sign === -1) {
      l -= coeffArray[0].length
      if (l < 0) {
        num = `${coeffArray[0].slice(0, l)}.${coeffArray[0].slice(l)}${
          coeffArray.length === 2 ? coeffArray[1] : ''
        }`
      } else {
        num = `${zero}.${new Array(l + 1).join(zero)}${coeffArray.join('')}`
      }
    } else {
      const dec = coeffArray[1]
      if (dec) l -= dec.length
      if (l < 0) {
        num = `${coeffArray[0] + dec.slice(0, l)}.${dec.slice(l)}`
      } else {
        num = coeffArray.join('') + new Array(l + 1).join(zero)
      }
    }
  }

  return nsign < 0 ? `-${num}` : num
}

const grain = () => {
  const cred = []
  data[1].users
    .filter(element => element.address[1] === 'identity')
    .map(element => {
      const entry = book.filter(input => {
        if (element.address[2] === input.name) {
          return input.address
        }
        return false
      })
      cred.push([
        entry[0].address,
        scientificToDecimal(
          element.intervalCred[element.intervalCred.length - 1],
        )
          .toString()
          .replace(/./g, ''),
      ])
      return true // Add error handling
    })

  transaction.mints = cred
  const write = JSON.stringify(transaction, null, 2)

  fs.writeFile('./transactionSettings.json', write, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
  return write
}
console.log(grain())
