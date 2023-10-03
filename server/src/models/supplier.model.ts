export interface ISupplier {
  id?: number
  user_id?: string
  legalForm?: string
  name?: string
  address?: string
  addressComplement?: string
  zipCode?: string
  city?: string
  siret?: string
  siren?: string
  tva?: string
  email?: string
  phone?: string
  comment?: string
  totalDebt?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ISupplierCreation extends ISupplier {
  user_id: string
  name: string
  email: string
}