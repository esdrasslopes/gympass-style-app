import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { CheckInUseCase } from "./check-in";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { Decimal } from "@prisma/client/runtime/library";

import { MaxDistanceError } from "./errors/max-distance-error";

import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;

let gymsRepository: InMemoryGymsRepository;

let sut: CheckInUseCase;

describe("Check in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();

    gymsRepository = new InMemoryGymsRepository();

    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -16.0781547,
      longitude: -47.9911217,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -16.0781547,
      userLongitude: -47.9911217,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be not able to check twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -16.0781547,
      userLongitude: -47.9911217,
    });

    await expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -16.0781547,
        userLongitude: -47.9911217,
      });
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check twice but in different day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -16.0781547,
      userLongitude: -47.9911217,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -16.0781547,
      userLongitude: -47.9911217,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    await gymsRepository.create({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-16.0492208),
      longitude: new Decimal(-47.9723605),
      created_at: new Date(),
    });

    expect(async () => {
      await sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -15.9576531,
        userLongitude: -47.8946573,
      });
    }).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
