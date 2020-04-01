/* eslint-disable import/newline-after-import */

const grain = require('../src/processScores')

describe('grain', async () => {
  it('should pass', async () => {
    await expect(grain.default()).toStrictEqual(grain.default())
  })
})
