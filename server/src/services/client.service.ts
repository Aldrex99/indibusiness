import prismaCreation from "../utils/prisma.util";
import { IClient, IClientCreation } from "../models/client.model";

const prisma = prismaCreation();

export const createClient = async (data: IClientCreation) => {
  return prisma.client.create({
    data: {
      ...data,
    }
  });
}

export const getAllClients = async (userId: string) => {
  return prisma.client.findMany({
    where: {
      user_id: userId
    }
  });
}

export const getClient = async (userId: string, clientId: number) => {
  return prisma.client.findMany({
    where: {
      id: clientId,
      user_id: userId
    }
  });
}

export const updateClient = async (userId: string, clientId: number, data: IClient) => {
  return prisma.client.updateMany({
    where: {
      id: clientId,
      user_id: userId
    },
    data: {
      ...(data.legalForm && data.legalForm !== "" && {legalForm: data.legalForm}),
      ...(data.name && data.name !== "" && {name: data.name}),
      ...(data.address && data.address !== "" && {address: data.address}),
      ...(data.addressComplement && data.addressComplement !== "" && {addressComplement: data.addressComplement}),
      ...(data.zipCode && data.zipCode !== "" && {zipCode: data.zipCode}),
      ...(data.city && data.city !== "" && {city: data.city}),
      ...(data.email && data.email !== "" && {email: data.email}),
      ...(data.phone && data.phone !== "" && {phone: data.phone}),
      ...(data.siret && data.siret !== "" && {siret: data.siret}),
      ...(data.siren && data.siren !== "" && {siren: data.siren}),
      ...(data.tva && data.tva !== "" && {tva: data.tva}),
      ...(data.comment && data.comment !== "" && {comment: data.comment}),
      ...(data.paymentDelay && data.paymentDelay !== 0 && {paymentDelay: data.paymentDelay}),
      ...(data.paymentMethod && data.paymentMethod !== "" && {paymentMethod: data.paymentMethod}),
    }
  });
}

export const addAtTotalReceivable = async (userId: string, clientId: number, amountReceivable: number) => {
  return prisma.client.updateMany({
    where: {
      id: clientId,
      user_id: userId
    },
    data: {
      totalReceivable: {
        increment: amountReceivable
      }
    }
  });
}

export const removeAtTotalReceivable = async (userId: string, clientId: number, amountReceivable: number) => {
  return prisma.client.updateMany({
    where: {
      id: clientId,
      user_id: userId
    },
    data: {
      totalReceivable: {
        decrement: amountReceivable
      }
    }
  });
}

export const deleteClient = async (userId: string, clientId: number) => {
  return prisma.client.deleteMany({
    where: {
      id: clientId,
      user_id: userId
    }
  });
}
