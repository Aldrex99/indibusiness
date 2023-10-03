import prismaCreation from "../utils/prisma.util";
import uuidTokenUtil from "../utils/uuidToken.util";

const prisma = prismaCreation();

export const create = async (userId : string) => {
  const token = uuidTokenUtil();
  return prisma.emailVerification.create({
    data: {
      token: token,
      user_id: userId,
      expiresAt: new Date(Date.now()), /* + 1000 * 60 * 60 * 24 * 14*/
    },
    select: {
      token: true,
    }
  });
}

export const get = async (token : string, userId : string) => {
  return prisma.emailVerification.findMany({
    where: {
      token: token,
      user_id: userId,
    },
    select: {
      expiresAt: true,
    }
  });
}

export const checkExpiration = async (token : string, userId : string) => {
  const expiration = await get(token, userId);
  if (!expiration) {
    return false;
  }

  console.log([expiration])

  return expiration[0].expiresAt > new Date();
}

export const del = async (token : string, userId : string) => {
  return prisma.emailVerification.deleteMany({
    where: {
      token: token,
      user_id: userId,
    }
  });
}

export const verify = async (token : string, userId : string) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: true,
    },
    select: {
      emailVerified: true,
    }
  });

  if (!user) {
    return false;
  }

  await del(token, userId);
  return true;
}