import prismaCreation from "../utils/prisma.util";
import { IDebt, IDebtCreation, IGetFilteredDebts } from "../models/debt.model";

const prisma = prismaCreation();

export const createDebt = async (data: IDebtCreation) => {
  return prisma.debt.create({
    data: {
      ...data,
    }
  });
}

export const getFilteredDebts = async (data: IGetFilteredDebts) => {
  const whereClause = {}

  if (data.search) {
    whereClause["OR"] = [
      {name: {contains: data.search}},
      {supplier_name: {contains: data.search}},
      {amount: {equals: parseFloat(data.search)}},
    ]
  }

  if (data.status) {
    whereClause["status"] = data.status;
  }

  if (data.isRenewable !== undefined) {
    whereClause["renewalDate"] = data.isRenewable ? {not: null} : null;
  }

  return prisma.debt.findMany({
    where: {
      user_id: data.user_id,
      ...whereClause
    },
    skip: data.skip,
    take: data.take,
    orderBy: {
      [data.orderBy]: data.order
    }
  });
}

export const getDebt = async (userId: string, debtId: number) => {
  return prisma.debt.findMany({
    where: {
      id: debtId,
      user_id: userId
    }
  });
}

export const updateDebt = async (userId: string, debtId: number, data: IDebt) => {
  return prisma.debt.updateMany({
    where: {
      id: debtId,
      user_id: userId
    },
    data: {
      ...(data.supplier_name && data.supplier_name !== "" && {supplier_name: data.supplier_name}),
      ...(data.name && data.name !== "" && {name: data.name}),
      ...(data.amount && data.amount !== 0 && {amount: data.amount}),
      ...(data.dueDate && {dueDate: data.dueDate}),
      ...(data.status && data.status !== "" && {status: data.status}),
      ...(data.renewalDate && {renewalDate: data.renewalDate}),
      ...(data.renewalType && data.renewalType !== "" && {renewalType: data.renewalType}),
      ...(data.comment && data.comment !== "" && {comment: data.comment}),
    }
  });
}

export const deleteDebt = async (userId: string, debtId: number) => {
  return prisma.debt.deleteMany({
    where: {
      id: debtId,
      user_id: userId
    }
  });
}
