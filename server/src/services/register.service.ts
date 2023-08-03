import prismaCreation from "../utils/prisma.util";
import {hashPassword} from "../utils/password.util";

const prisma = prismaCreation();

export const alreadyExists = async (email : string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  return !!user;
}

export const registerUser = async (email : string, password : string, role : string) => {
  return prisma.user.create({
    data: {
      email: email,
      password: await hashPassword(password),
      role: role,
    },
    select : {
      id: true,
    }
  });
}

export const registerIndividual = async (firstname : string, lastname : string, userId : string) => {
  return prisma.individual.create({
    data: {
      firstname: firstname,
      lastname: lastname,
      user_id: userId,
    }
  });
}

export const registerCompany = async (name : string, legalForm : string, userId : string) => {
  return prisma.company.create({
    data: {
      name: name,
      legalForm: legalForm,
      user_id: userId,
    }
  });
}

export const register = async (email : string, password : string, role : string, firstname : string, lastname : string, name : string, legalForm : string) => {
  const user = await registerUser(email, password, role);
  if (role === "individual") {
    await registerIndividual(firstname, lastname, user.id);
  } else {
    await registerCompany(name, legalForm, user.id);
  }

  prisma.$disconnect();
  return user;
}