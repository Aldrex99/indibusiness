import prismaCreation from "../utils/prisma.util";
import { ISupplier, ISupplierCreation } from "../models/supplier.model";

const prisma = prismaCreation();

export const createSupplier = async (data: ISupplierCreation) => {
  return prisma.supplier.create({
    data: {
      ...data,
    }
  });
}

export const getAllSuppliers = async (userId: string) => {
  return prisma.supplier.findMany({
    where: {
      user_id: userId
    }
  });
}

export const getSupplier = async (userId: string, supplierId: number) => {
  return prisma.supplier.findMany({
    where: {
      id: supplierId,
      user_id: userId
    }
  });
}

export const updateSupplier = async (userId: string, supplierId: number, data: ISupplier) => {
  return prisma.supplier.updateMany({
    where: {
      id: supplierId,
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
    }
  });
}

export const addAtTotalDebt = async (userId: string, supplierId: number, amountPayable: number) => {
  return prisma.supplier.updateMany({
    where: {
      id: supplierId,
      user_id: userId
    },
    data: {
      totalDebt: {
        increment: amountPayable
      }
    }
  });
}

export const removeAtTotalDebt = async (userId: string, supplierId: number, amountPayable: number) => {
  return prisma.supplier.updateMany({
    where: {
      id: supplierId,
      user_id: userId
    },
    data: {
      totalDebt: {
        decrement: amountPayable
      }
    }
  });
}

export const deleteSupplier = async (userId: string, supplierId: number) => {
  return prisma.supplier.deleteMany({
    where: {
      id: supplierId,
      user_id: userId
    }
  });
}