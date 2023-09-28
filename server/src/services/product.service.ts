import prismaCreation from "../utils/prisma.util";
import { IProductDocumentCreation } from "../models/product.model";
import { documentProduct, Prisma } from "@prisma/client";

const prisma = prismaCreation();

export const savedProductCreate = async () => {
  // TODO : Create a saved product in the database
}

export const savedProductGetAll = async () => {
  // TODO : Get all saved products from the database
}

export const savedProductGet = async () => {
  // TODO : Get a saved product from the database
}

export const savedProductUpdate = async () => {
  // TODO : Update a saved product in the database
}

export const savedProductDelete = async () => {
  // TODO : Delete a saved product from the database
}

export const documentProductCreate = (data: IProductDocumentCreation) : Prisma.Prisma__documentProductClient<documentProduct> => {
  return prisma.documentProduct.create({
    data: {
      ...data
    }
  });
}

export const documentProductGet = async (documentId: number) => {
  return prisma.documentProduct.findMany({
    where: {
      document_id: documentId,
    }
  });
}