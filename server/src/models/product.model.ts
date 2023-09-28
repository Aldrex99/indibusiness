export type TProductDocument = {
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitaryExclTvaPrice: number;
  discountRate?: number;
  totalExclTvaPrice: number;
  tvaRate: number;
  totalInclTvaPrice: number;
};

export interface IProductDocumentCreation {
  document_id: number;
  shortId: string;
  name: string;
  description?: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  tvaRate: number;
  discountRate?: number;
}