const data = require("../assets/data.json");

test("100 actor results", () => {
  expect(data.actors).toHaveLength(100);
});
