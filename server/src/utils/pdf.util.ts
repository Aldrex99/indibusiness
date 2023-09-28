import { IProductDocumentCreation, TProductDocument } from "../models/product.model";
import {
  IDocumentCreatePDF,
  IDocumentPDFCreation,
  TClientInformation,
  TDocumentInformation,
  TMyInformation,
  TTotalInformation,
  TTvaInformation
} from "../models/document.model";
import { convertISO8601ToSlashDate } from "./dateFormat.util";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { translateType } from "./translateTypeStatus.util";

const formatProductsDocument = (productsDocument: IProductDocumentCreation[]): TProductDocument[] => {
  return productsDocument.map((productDocument: IProductDocumentCreation) => {
    if (!productDocument.discountRate) {
      productDocument.discountRate = 0;
    }
    return {
      name: productDocument.name,
      description: productDocument.description,
      quantity: productDocument.quantity,
      unit: productDocument.unit,
      unitaryExclTvaPrice: parseFloat(productDocument.unitPrice.toFixed(2)),
      discountRate: productDocument.discountRate,
      totalExclTvaPrice: parseFloat((productDocument.quantity * productDocument.unitPrice * (1 - productDocument.discountRate / 100)).toFixed(2)),
      tvaRate: productDocument.tvaRate,
      totalInclTvaPrice: parseFloat((productDocument.quantity * productDocument.unitPrice * (1 - productDocument.discountRate / 100) * (1 + productDocument.tvaRate / 100)).toFixed(2)),
    }
  });
}

const formatTvaInformation = (productsDocument: TProductDocument[], generalDiscountRate?: number): TTvaInformation[] => {
  const tvaInformation: TTvaInformation[] = [];
  const tvaRates: number[] = [];

  productsDocument.forEach((productDocument: TProductDocument) => {
    if (!tvaRates.includes(productDocument.tvaRate)) {
      tvaRates.push(productDocument.tvaRate);
    }
  });

  tvaRates.forEach((tvaRate: number) => {
    let totalExclTvaPrice = 0;
    let totalTva = 0;

    productsDocument.forEach((productDocument: TProductDocument) => {
      if (productDocument.tvaRate === tvaRate) {
        if (!generalDiscountRate) {
          generalDiscountRate = 0;
        }
        totalExclTvaPrice += parseFloat((productDocument.totalExclTvaPrice * (1 - generalDiscountRate / 100)).toFixed(2));
        totalTva += parseFloat((productDocument.totalExclTvaPrice * productDocument.tvaRate / 100 * (1 - generalDiscountRate / 100)).toFixed(2));
      }
    });

    tvaInformation.push({
      tvaRate,
      totalExclTvaPrice,
      totalTva,
    });
  });

  return tvaInformation;
}

const formatTotalInformation = (productsDocument: TProductDocument[], generalDiscountRate?: number, additionalCostName?: string, additionalCostAmount?: number): TTotalInformation => {
  let totalExclTvaPricePreDiscount = 0;
  let totalExclTvaPrice = 0;
  let totalTva = 0;
  let totalInclTvaPrice = 0;

  productsDocument.forEach((productDocument: TProductDocument) => {
    if (!generalDiscountRate) {
      generalDiscountRate = 0;
    }
    if (!additionalCostAmount) {
      additionalCostAmount = 0;
    }

    totalExclTvaPricePreDiscount += parseFloat(productDocument.totalExclTvaPrice.toFixed(2));
    totalExclTvaPrice += parseFloat((productDocument.totalExclTvaPrice * (1 - generalDiscountRate / 100)).toFixed(2));
    totalTva += parseFloat((productDocument.totalExclTvaPrice * productDocument.tvaRate / 100 * (1 - generalDiscountRate / 100)).toFixed(2));
    totalInclTvaPrice += parseFloat((productDocument.totalInclTvaPrice * (1 - generalDiscountRate / 100)).toFixed(2));
  });

  if (additionalCostName && additionalCostAmount) {
    totalInclTvaPrice += additionalCostAmount;
  }

  return {
    totalExclTvaPricePreDiscount,
    generalDiscountRate,
    generalDiscountAmount: totalExclTvaPricePreDiscount - totalExclTvaPrice,
    additionalCostName,
    additionalCostAmount,
    totalExclTvaPrice,
    totalTva,
    totalInclTvaPrice,
  }
}

const formatMyClientAndDocumentInformation = (document: IDocumentCreatePDF): {
  my: TMyInformation,
  client: TClientInformation,
  document: TDocumentInformation
} => {
  return {
    my: {
      legalForm: document.legalForm,
      name: document.name,
      address: document.address,
      addressComplement: document.addressComplement,
      zipCode: document.zipCode,
      city: document.city,
      siren: document.siren,
      tva: document.tva,
    },
    client: {
      legalForm: document.clientLegalForm,
      name: document.clientName,
      address: document.clientAddress,
      addressComplement: document.clientAddressComplement,
      zipCode: document.clientZipCode,
      city: document.clientCity,
    },
    document: {
      type: translateType(document.type),
      number: document.number,
      date: typeof document.date !== "string" ? convertISO8601ToSlashDate(document.date.toISOString()) : convertISO8601ToSlashDate(document.date),
      dueDate: typeof document.dueDate !== "string" ? convertISO8601ToSlashDate(document.dueDate?.toISOString()) : convertISO8601ToSlashDate(document.dueDate),
      specialMention: document.specialMention,
    }
  }
}

const formatAllDocumentInformation = (document: IDocumentCreatePDF, products: IProductDocumentCreation[]): IDocumentPDFCreation => {
  const {my, client, document: documentInformation} = formatMyClientAndDocumentInformation(document);

  const productsDocument: TProductDocument[] = formatProductsDocument(products);

  const tvaInformation: TTvaInformation[] = formatTvaInformation(productsDocument, document.generalDiscountRate);

  const totalInformation: TTotalInformation = formatTotalInformation(productsDocument, document.generalDiscountRate, document.additionalCostName, document.additionalCostAmount);

  return {
    my,
    client,
    document: documentInformation,
    products: productsDocument,
    tva: tvaInformation,
    total: totalInformation,
  }
}

export const documentPDFCreation = (document: IDocumentCreatePDF, products: IProductDocumentCreation[]) => {
  const templateLink = fs.readFileSync(path.resolve(__dirname, '../template/document.template.html'), 'utf8');

  handlebars.registerHelper('neq', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
  });

  const compiledTemplate = handlebars.compile(templateLink);

  const documentInformation = formatAllDocumentInformation(document, products);

  return compiledTemplate(documentInformation);
}

