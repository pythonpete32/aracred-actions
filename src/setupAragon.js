#!/usr/bin/env node

const fs = require('fs')

const args = process.argv.slice(2)
const keySettings = JSON.stringify(
  {
    rpc: `https://mainnet.infura.io/v3/${args[0]}`,
    keys: [`${args[1]}`],
  },
  null,
  2,
)

try {
  const dir = '/home/aaron/.aragon'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log('created `~/.aragon` file')
  }
  fs.writeFile('/home/aaron/.aragon/rinkeby_key.json', keySettings, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully setup keys')
    }
  })
} catch (err) {
  console.error(err)
  process.exit(-1)
}
