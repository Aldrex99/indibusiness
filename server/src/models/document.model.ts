import { TProductDocument } from "./product.model";

export type TMyInformation = {
  legalForm: string;
  name: string;
  address: string;
  addressComplement?: string;
  zipCode: string;
  city: string;
  siren: string;
  tva: string;
}

export type TClientInformation = {
  legalForm?: string;
  name: string;
  address: string;
  addressComplement?: string;
  zipCode: string;
  city: string;
}

export type TDocumentInformation = {
  type: string;
  number: string;
  date: string;
  dueDate?: string;
  specialMention?: string;
}

export type TTvaInformation = {
  tvaRate: number;
  totalExclTvaPrice: number;
  totalTva: number;
}

export type TTotalInformation = {
  totalExclTvaPricePreDiscount?: number;
  generalDiscountRate?: number;
  generalDiscountAmount?: number;
  additionalCostName?: string;
  additionalCostAmount?: number;
  totalExclTvaPrice: number;
  totalTva: number;
  totalInclTvaPrice: number;
}

export interface IDocumentPDFCreation {
  document: TDocumentInformation;
  client: TClientInformation;
  my: TMyInformation;
  products: TProductDocument[];
  tva: TTvaInformation[];
  total: TTotalInformation;
}

export interface IDocumentCreate {
  user_id: string;
  client_id: number;
  type: string;
  number: string;
  date: Date | string;
  dueDate?: Date | string;
  legalForm: string;
  name: string;
  address: string;
  addressComplement?: string;
  zipCode: string;
  city: string;
  clientLegalForm?: string;
  clientName: string;
  clientAddress: string;
  clientAddressComplement?: string;
  clientZipCode: string;
  clientCity: string;
  totalHT: number;
  totalTTC: number;
  totalTVA: number;
  additionalCostName?: string;
  additionalCostAmount?: number;
  generalDiscountRate?: number;
  generalDiscountAmount?: number;
  specialMention?: string;
  status: string;
  documentLink: string;
}

export interface IDocumentCreatePDF extends IDocumentCreate {
  siren: string;
  tva: string;
}

export interface IGetFilteredDocuments {
  user_id?: string;
  skip?: number;
  take?: number;
  search?: string;
  status?: string;
  type?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}