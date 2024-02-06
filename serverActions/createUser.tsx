"use server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

type CreateUser = Omit<User, "id">;

export async function createUser({ name, email, password }: CreateUser) {
  await prisma.user.create({
    data: {
      name: "testUser",
      email: "test@test.com",
      password: await hash("test@test.com", 10),
    },
  });
}
