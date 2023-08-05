export interface IClient {
  id?: number;
  user_id?: string;
  legalForm?: string;
  name?: string;
  address?: string;
  addressComplement?: string;
  zipCode?: string;
  city?: string;
  email?: string;
  phone?: string;
  siret?: string;
  siren?: string;
  tva?: string;
  comment?: string;
  paymentDelay?: number;
  paymentMethod?: string;
  totalReceivable?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClientCreation extends IClient {
  user_id: string;
  name: string;
  email: string;
}