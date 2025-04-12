export interface ICustomer {
  uuid: string;
  name: string;
  surname: string;
  address: {
    city: string;
    street: string;
  };
}

export interface IDataTableStatus {
  orderKey: EOrderKey;
  orderDirection: EOrderDirection;
  customers: ICustomer[];
  selectedCustomerIDs: string[];
  filterString: string;
  showForm: boolean;
  formData: IFormData;
  customerIDCounter: number;
  formOperation?: EFormOperation;
}

export enum EOrderKey {
  NAME = 'NAME',
  SURNAME = 'SURNAME',
  CITY = 'CITY',
}
export enum EOrderDirection {
  ASC = 'ASC',
  DES = 'DES',
}
export enum EFormOperation {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export interface IFormData {
  name: string;
  surname: string;
  city: string;
  street: string;
}
