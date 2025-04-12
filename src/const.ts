import { initialCustomers } from './DataTable.data';
import {
  EOrderDirection,
  EOrderKey,
  IDataTableStatus,
} from './DataTable.models';

export const DATA_TABLE_STATUS_STORAGE_KEY = 'DATA_TABLE_STATUS';

export const DEFAULT_TABLE_STATUS: IDataTableStatus = {
  orderKey: EOrderKey.NAME,
  orderDirection: EOrderDirection.ASC,
  customers: initialCustomers,
  selectedCustomerIDs: [],
  filterString: '',
};
