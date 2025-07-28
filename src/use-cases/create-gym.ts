import { IGymsRepository } from "@/repositories/gyms-repository";

import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  private gymsRepository: IGymsRepository;

  constructor(gymsRepository: IGymsRepository) {
    this.gymsRepository = gymsRepository;
  }

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    });

    return { gym };
  }
}
