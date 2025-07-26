import { it, describe, expect, beforeEach } from "vitest";

import { hash } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { GetUserProfileUseCase } from "./get-user-profile";

import { ResourceNotFoundError } from "./errors/rosource-not-found-error";

let usersRepository: InMemoryUsersRepository;

let sut: GetUserProfileUseCase;
// Padrão SUT - system under test

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));

    expect(user.name).toEqual("John Doe");
  });

  it("should be not able to get user profile with wrong id", async () => {
    expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
