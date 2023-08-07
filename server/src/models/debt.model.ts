export interface IDebt {
  id?: number;
  user_id?: string;
  supplier_id?: number;
  supplier_name?: string;
  name?: string;
  amount?: number;
  dueDate?: Date | string;
  status?: string;
  renewalDate?: Date;
  renewalType?: string;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDebtCreation extends IDebt {
  user_id: string;
  supplier_name: string;
  name: string;
  amount: number;
  dueDate: Date | string;
  status: string;
}

export interface IGetFilteredDebts {
  user_id?: string;
  skip?: number;
  take?: number;
  search?: string;
  status?: string;
  isRenewable?: boolean;
  orderBy?: string;
  order?: "asc" | "desc";
}