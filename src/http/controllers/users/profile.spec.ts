import { it, describe, expect, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    console.log(token);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    console.log(profileResponse.body);

    expect(profileResponse.statusCode).toEqual(200);

    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@exemple.com",
      })
    );
  });
});
