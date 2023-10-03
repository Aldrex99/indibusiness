import prismaCreation from "../utils/prisma.util";
import { IReceivable, IReceivableCreation, IGetFilteredReceivables } from "../models/receivable.model";

const prisma = prismaCreation();

export const createReceivable = async (data: IReceivableCreation) => {
  return prisma.receivable.create({
    data: {
      ...data,
    }
  });
}

export const getFilteredReceivables = async (data: IGetFilteredReceivables) => {
  const whereClause = {}

  if (data.search) {
    whereClause["OR"] = [
      {name: {contains: data.search, mode: "insensitive"}},
      {client_name: {contains: data.search, mode: "insensitive"}},
    ]

    const amountValue = parseFloat(data.search);
    if (!isNaN(amountValue)) {
      whereClause["OR"].push({amount: {equals: amountValue}});
    }
  }

  if (data.status) {
    whereClause["status"] = data.status;
  }

  return prisma.receivable.findMany({
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

export const getReceivable = async (userId: string, receivableId: number) => {
  return prisma.receivable.findMany({
    where: {
      id: receivableId,
      user_id: userId
    }
  });
}

export const updateReceivable = async (userId: string, receivableId: number, data: IReceivable) => {
  return prisma.receivable.updateMany({
    where: {
      id: receivableId,
      user_id: userId
    },
    data: {
      ...(data.client_name && data.client_name !== "" && {client_name: data.client_name}),
      ...(data.name && data.name !== "" && {name: data.name}),
      ...(data.amount && data.amount !== 0 && {amount: data.amount}),
      ...(data.dueDate && data.dueDate !== "" && {dueDate: data.dueDate}),
      ...(data.status && data.status !== "" && {status: data.status}),
      ...(data.comment && data.comment !== "" && {comment: data.comment}),
    }
  });
}

export const deleteReceivable = async (userId: string, receivableId: number) => {
  return prisma.receivable.deleteMany({
    where: {
      id: receivableId,
      user_id: userId
    }
  });
}