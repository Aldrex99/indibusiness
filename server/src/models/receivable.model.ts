export interface IReceivable {
  id?: number;
  user_id?: string;
  client_id?: number;
  document_id?: number;
  client_name?: string;
  name?: string;
  amount?: number;
  dueDate?: Date | string;
  status?: string;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReceivableCreation extends IReceivable {
  user_id: string;
  client_name: string;
  name: string;
  amount: number;
  dueDate: Date | string;
  status: string;
}

export interface IGetFilteredReceivables {
  user_id?: string;
  skip?: number;
  take?: number;
  search?: string;
  status?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}