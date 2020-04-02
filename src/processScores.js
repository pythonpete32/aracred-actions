/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

const writeFile = require('fs')

const BigNumber = require('bignumber.js')

const data = require('../scores.json')
const book = require('../addressbook.json')

const transaction = {
  daoAddress: '0x80ac741A39b4cCc71163d71a75b6ad498Ccd30d6',
  tokenManagerAddress: '0x96794a087c6f54012e4d3e05117998418a3e305f',
  votingAddress: '0xe7f194cd2d2d13635b7d617d9bfe31ee919eb858',
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
