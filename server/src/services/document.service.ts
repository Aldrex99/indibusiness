import prismaCreation from "../utils/prisma.util";
import * as PDFUtil from "../utils/pdf.util";
import { IDocumentCreate, IGetFilteredDocuments } from "../models/document.model";

const prisma = prismaCreation();

export const saveDocumentInformations = (data: IDocumentCreate) => {
  return prisma.document.create({
    data: {
      ...data
    }
  })
}

export const getFilteredDocuments = async (data: IGetFilteredDocuments) => {
  const whereClause = {}

  if (data.search) {
    whereClause["OR"] = [
      {number: {contains: data.search, mode: 'insensitive'}},
      {clientName: {contains: data.search, mode: 'insensitive'}},
    ]

    const amountValue = parseFloat(data.search);
    if (!isNaN(amountValue)) {
      whereClause["OR"].push({totalHT: {equals: amountValue}}, {totalTTC: {equals: amountValue}});
    }
  }

  if (data.status) {
    whereClause["status"] = data.status;
  }

  if (data.type) {
    whereClause["type"] = data.type;
  }

  return prisma.document.findMany({
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

export const getDocumentInformations = async (userId: string, documentId: number) => {
  return prisma.document.findMany({
    where: {
      id: documentId,
      user_id: userId
    }
  });
}

export const documentPDFCreation = async (data: any) => {
  // TODO : Create the document PDF
  // TODO : Save the document PDF in Object Storage
}

export const downloadDocuments = async () => {
  // TODO : Download the document PDF
}

export const downloadManyDocuments = async () => {
  // TODO : Download many documents PDF
}