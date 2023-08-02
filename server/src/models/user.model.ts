export interface IUser {
  id: string;
  email: string;
  phone?: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIndividual extends IUser {
  firstname: string;
  lastname: string;
}

export interface ICompany extends IUser {
  legalForm: string;
  name: string;
  address?: string;
  addressComplement?: string;
  zipCode?: string;
  city?: string;
  siret?: string;
  siren?: string;
  tva?: string;
  subscriber: boolean;
  pastSubscriber: boolean;
}

export interface ISubscribedCompany extends ICompany {
  plan: string;
  startDate: Date;
  endDate: Date;
}