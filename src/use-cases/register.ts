import { hash } from "bcryptjs";

import { IUsersRepository } from "../repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ password, email, name }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
