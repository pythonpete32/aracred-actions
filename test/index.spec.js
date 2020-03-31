/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
const sayHello = require('../src/index')
console.log(sayHello)
test('sayHello', () => {
  expect(sayHello.default('foo')).toBe('Hello, foo!')
})
