import {hash, genSalt, compare} from "bcrypt";

export const hashPassword = async (plainTextPassword: string) => {
  const salt = await genSalt(10);
  return await hash(plainTextPassword, salt);
}

export const checkPassword = async (inputPassword: string, hashedPassword: string) => {
  return await compare(inputPassword, hashedPassword);
}