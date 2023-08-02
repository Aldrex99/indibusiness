import prismaCreation from "../utils/prisma.util";
import { checkPassword } from "../utils/password.util";
import { ICompany, IIndividual, ISubscribedCompany, IUser } from "../models/user.model";

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

const getIndividualUser = async (user: IUser) => {
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

const getCompanyUser = async (user: IUser) => {
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