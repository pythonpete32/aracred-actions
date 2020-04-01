const fs = require('fs')
const data = require('../scores.json')
const book = require('../addressbook.json')
const transaction = require('../assignations.json')

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
        element.intervalCred[element.intervalCred.length - 1],
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
