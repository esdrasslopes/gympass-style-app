import { it, describe, expect, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { prisma } from "@/lib/prisma";

describe("Check In metrics controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get the count of check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description",
        phone: "1188118818",
        latitude: -16.0492208,
        longitude: -47.9723605,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);

    expect(response.body.checkInsCount).toEqual(2);
  });
});
