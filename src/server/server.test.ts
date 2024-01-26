/* eslint-disable no-undef */
import request from "supertest";
import App, { server } from "./index";

describe("Server", () => {
  it("should return a 404 status code for GET /unknown", async () => {
    const response = await request(App).get("/unknown");
    expect(response.status).toBe(404);
  });

  afterAll(() => {
    server.close();
  });
});
