import { hash } from "bcryptjs";

import { prisma } from "../lib/prisma";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async ({
  password,
  email,
  name,
}: RegisterUseCaseRequest) => {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
};
