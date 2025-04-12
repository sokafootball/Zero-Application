import { initialCustomers } from './components/DataTable/DataTable.data';
import {
  EOrderDirection,
  EOrderKey,
  IDataTableStatus,
} from './components/DataTable/DataTable.models';

export const DATA_TABLE_STATUS_STORAGE_KEY = 'DATA_TABLE_STATUS';

export const DEFAULT_TABLE_STATUS: IDataTableStatus = {
  orderKey: EOrderKey.NAME,
  orderDirection: EOrderDirection.ASC,
  customers: initialCustomers,
  selectedCustomerIDs: [],
  filterString: '',
  showForm: false,
  customerIDCounter: 2,
  formData: {
    name: '',
    surname: '',
    city: '',
    street: '',
  },
};
