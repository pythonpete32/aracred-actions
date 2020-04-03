/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

// TODO: Refactor
// Refactor into exportable functions for testing

const writeFile = require('fs')

const BigNumber = require('bignumber.js')

const data = require('../scores.json')
const book = require('../addressbook.json')

const transaction = {
  daoAddress: '0xF482482163AfE0B2fC30B835b59C8fBEd7942d04',
  tokenManagerAddress: '0xdbd6431a62f6e328656f07999e3a78109a95c5a1',
  votingAddress: '0xc833f79c13d53775fc124785d143e2a3927d8cca',
  environment: 'rinkeby',
  mints: [],
  burns: [],
}
/**
 * This function transforms SourceCredit Scores and an Aragon Addressbook
 * into a configuration file for the toolkit script
 * @returns The config json
 */

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
        new BigNumber(element.intervalCred[element.intervalCred.length - 1])
          .toFixed(18)
          .toString()
          .replace('.', ''),
      ])
      return true // Add error handling
    })

  console.log(cred)

  transaction.mints = cred
  const write = JSON.stringify(transaction, null, 2)

  writeFile('./transactionSettings.json', write, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      // console.log('Successfully wrote file')
    }
  })
  return write
}
