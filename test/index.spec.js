import { sayHello } from "../src/index";
console.log(sayHello)
test("sayHello", () => {
  expect(sayHello("foo")).toBe("Hello, foo!");
});
