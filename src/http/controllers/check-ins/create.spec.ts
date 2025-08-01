import { it, describe, expect, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { prisma } from "@/lib/prisma";

describe("Create Check In controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description",
        phone: "1188118818",
        latitude: -16.0492208,
        longitude: -47.9723605,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -16.0492208,
        longitude: -47.9723605,
      });

    expect(response.statusCode).toEqual(201);
  });
});
