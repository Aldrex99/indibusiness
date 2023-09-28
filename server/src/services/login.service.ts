import prismaCreation from "../utils/prisma.util";
import { checkPassword } from "../utils/password.util";
import { IUser } from "../models/user.model";
import { getCompanyUser, getIndividualUser } from "./user.service";

const prisma = prismaCreation();

const connectUser = async (email: string, password: string) => {
  const rawUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!rawUser) {
    throw new Error("Les identifiants sont incorrects");
  }

  const passwordMatch = await checkPassword(password, rawUser.password);

  if (!passwordMatch) {
    throw new Error("Les identifiants sont incorrects");
  }

  const user: IUser = {
    id: rawUser.id,
    email: rawUser.email,
    phone: rawUser.phone,
    role: rawUser.role,
    emailVerified: rawUser.emailVerified,
    createdAt: rawUser.createdAt,
    updatedAt: rawUser.updatedAt,
  };

  return user;
}

export const login = async (email: string, password: string) => {
  const user: IUser = await connectUser(email, password);

  switch (user.role) {
    case "individual":
      return await getIndividualUser(user);
    case "freeCompany":
    case "premiumCompany":
      return await getCompanyUser(user);
    default:
      return user;
  }
}

export const check = async (userId: string) => {
  const user: IUser = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  switch (user.role) {
    case "individual":
      return await getIndividualUser(user);
    case "freeCompany":
    case "premiumCompany":
      return await getCompanyUser(user);
    default:
      return user;
  }
}

export const refresh = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      role: true,
    }
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  return user;
}

export const logout = async (userId: string) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastLogout: new Date()
    },
    select: {
      lastLogout: true
    }
  });
}