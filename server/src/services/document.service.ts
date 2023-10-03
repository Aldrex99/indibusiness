import prismaCreation from "../utils/prisma.util";
import { documentPDFCreation } from "../utils/pdf.util";
import { IDocumentCreate, IDocumentCreatePDF, IGetFilteredDocuments } from "../models/document.model";
import puppeteer from "puppeteer";
import { IProductDocumentCreation } from "../models/product.model";
import { s3Client } from "../utils/objectStorage.util";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const PDFGenerateAndUpload = async (document: IDocumentCreatePDF, products: IProductDocumentCreation[]) => {
  const content = documentPDFCreation(document, products);

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.setContent(content ? content : "");

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "10mm",
        bottom: "10mm",
        left: "10mm",
        right: "10mm",
      }
    });

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: document.documentLink,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ACL: 'private',
    }

    await s3Client.send(new PutObjectCommand(uploadParams));

    return true;
  } catch (error) {
    console.log("Error while generating PDF", error);
  } finally {
    await browser.close();
  }
};

export const downloadDocumentSignedURL = async (documentLink: string) => {
  try {
    if (!documentLink) return null;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: documentLink,
    });

    return await getSignedUrl(s3Client, command, {expiresIn: Number(process.env.AWS_SIGNED_URL_EXPIRATION_TIME)});
  } catch (error) {
    console.log("Error while generating signed URL", error);
    throw error;
  }
}

export const updateStatusDocument = async (userId: string, documentId: number, status: string) => {
  return prisma.document.updateMany({
    where: {
      id: documentId,
      user_id: userId
    },
    data: {
      status
    }
  });
}