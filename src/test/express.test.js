const app = require("./../server/server");
const supertest = require("supertest");
const request = supertest(app);

it("test endpoint", async () => {
  const response = await request.get("/testServer");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("pass!");
});
