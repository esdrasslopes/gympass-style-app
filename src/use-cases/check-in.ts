import { ICheckInsRepository } from "@/repositories/check-ins-repository";

import { IGymsRepository } from "@/repositories/gyms-repository";

import { CheckIn } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/rosource-not-found-error";

import { getDistanceBetweenCoodinates } from "@/utils/get-distance-between-coordintes";

import { MaxDistanceError } from "./errors/max-distance-error";

import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInsRepository: ICheckInsRepository;

  private gymsRepository: IGymsRepository;

  constructor(
    checkInsRepository: ICheckInsRepository,
    gymsRepository: IGymsRepository
  ) {
    this.checkInsRepository = checkInsRepository;

    this.gymsRepository = gymsRepository;
  }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoodinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const max_distance_in_kilometers = 0.1;

    if (distance > max_distance_in_kilometers) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
