import prismaCreation from "../utils/prisma.util";
import { ICompany, IIndividual, ISubscribedCompany, IUser } from "../models/user.model";

const prisma = prismaCreation();

export const getUser = async (userId: string) => {
  const shortUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!shortUser) {
    throw new Error("Utilisateur non trouvé");
  }

  switch (shortUser.role) {
    case "individual":
      return await getIndividualUser(shortUser);
    case "freeCompany":
    case "premiumCompany":
      return await getCompanyUser(shortUser);
    default:
      return shortUser;
  }
}

export const getIndividualUser = async (user: IUser) => {
  const rawIndividualUser = await prisma.individual.findUnique({
    where: {
      user_id: user.id
    },
    select: {
      firstname: true,
      lastname: true,
    }
  });

  if (!rawIndividualUser) {
    throw new Error("Utilisateur non trouvé");
  }

  const individualUser: IIndividual = {
    ...user,
    firstname: rawIndividualUser.firstname,
    lastname: rawIndividualUser.lastname,
  }

  return individualUser;
}

export const getCompanyUser = async (user: IUser) => {
  const rawCompanyUser = await prisma.company.findUnique({
    where: {
      user_id: user.id
    },
  });

  if (!rawCompanyUser) {
    throw new Error("Utilisateur non trouvé");
  }

  const companyUser: ICompany = {
    ...user,
    legalForm: rawCompanyUser.legalForm,
    name: rawCompanyUser.name,
    address: rawCompanyUser.address,
    addressComplement: rawCompanyUser.addressComplement,
    zipCode: rawCompanyUser.zipCode,
    city: rawCompanyUser.city,
    siret: rawCompanyUser.siret,
    siren: rawCompanyUser.siren,
    tva: rawCompanyUser.tva,
    subscriber: rawCompanyUser.subscriber,
    pastSubscriber: rawCompanyUser.pastSubscriber,
  }

  if (companyUser.subscriber) {
    const rawSubscribedCompanyUser = await prisma.subscription.findUnique({
      where: {
        user_id: user.id
      },
    });

    if (!rawSubscribedCompanyUser) {
      throw new Error("Utilisateur non trouvé");
    }

    const subscribedCompanyUser: ISubscribedCompany = {
      ...companyUser,
      plan: rawSubscribedCompanyUser.plan,
      startDate: rawSubscribedCompanyUser.startDate,
      endDate: rawSubscribedCompanyUser.endDate,
    }

    return subscribedCompanyUser;
  } else {
    return companyUser;
  }
}

export const getLastLogout = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      lastLogout: true
    }
  });
}