import { it, describe, expect, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { FetchNearbyGymsUseCase } from "./fetch-nerby-gyms";

let gymsRepository: InMemoryGymsRepository;

let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      latitude: -16.0492208,
      longitude: -47.9723605,
      description: null,
      phone: null,
    });

    await gymsRepository.create({
      title: "Far Gym",
      latitude: -15.9737842,
      longitude: -47.6187439,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -16.0781547,
      userLongitude: -47.9911217,
    });

    expect(gyms).toHaveLength(1);

    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
