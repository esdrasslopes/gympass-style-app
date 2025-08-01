import { ICheckInsRepository } from "@/repositories/check-ins-repository";

import { CheckIn } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/rosource-not-found-error";

import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

import dayjs from "dayjs";

interface ValidateUseCaseRequest {
  checkInId: string;
}

interface ValidateUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateUseCase {
  private checkInsRepository: ICheckInsRepository;

  constructor(checkInsRepository: ICheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({
    checkInId,
  }: ValidateUseCaseRequest): Promise<ValidateUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
