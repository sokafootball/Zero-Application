import {
  EOrderDirection,
  EOrderKey,
  ICustomer,
  IDataTableStatus,
} from './DataTable.models';

export const getColumnOrderIcon = (
  dataTableStatus: IDataTableStatus,
  orderKey: EOrderKey
): string =>
  dataTableStatus.orderKey !== orderKey
    ? 'Order'
    : dataTableStatus.orderKey === orderKey &&
      dataTableStatus.orderDirection === EOrderDirection.ASC
    ? 'A-Z'
    : 'Z-A';

export const getOrderedCustomers = (
  dataTableStatus: IDataTableStatus
): ICustomer[] => {
  const { customers, orderKey, orderDirection } = dataTableStatus;
  const sortedCustomers = [...customers];
  sortedCustomers.sort((a: ICustomer, b: ICustomer) => {
    let valueA: string;
    let valueB: string;

    switch (orderKey) {
      case EOrderKey.NAME:
        valueA = a.name;
        valueB = b.name;
        break;
      case EOrderKey.SURNAME:
        valueA = a.surname;
        valueB = b.surname;
        break;
      case EOrderKey.CITY:
        valueA = a.address.city;
        valueB = b.address.city;
        break;
      default:
        return 0;
    }

    const comparison = valueA.localeCompare(valueB);

    return orderDirection === EOrderDirection.DES
      ? comparison * -1
      : comparison;
  });

  return sortedCustomers;
};

export const getFilteredCustomers = (
  filterString: string,
  customers: ICustomer[]
): ICustomer[] => {
  const trimmedFilter = filterString.trim();
  if (!trimmedFilter) {
    return [...customers];
  }
  const lowerCaseFilter = trimmedFilter.toLowerCase();
  return customers.filter((customer) => {
    const nameMatch = customer.name.toLowerCase().includes(lowerCaseFilter);
    const surnameMatch = customer.surname
      .toLowerCase()
      .includes(lowerCaseFilter);
    const cityMatch = customer.address.city
      .toLowerCase()
      .includes(lowerCaseFilter);
    return nameMatch || surnameMatch || cityMatch;
  });
};

export const removeCustomer = (
  customers: ICustomer[],
  customerID: string
): ICustomer[] => {
  const customerToRemove = customers.find(
    (customer) => customer.uuid === customerID
  );
  if (!customerToRemove) {
    return customers;
  }
  const newCustomers = [...customers];
  const customerIndex = customers.indexOf(customerToRemove);
  newCustomers.splice(customerIndex, 1);
  return newCustomers;
};

export const removeCustomers = (
  customers: ICustomer[],
  customersToRemoveIDs: string[]
): ICustomer[] => {
  let newCustomers = [...customers];
  customersToRemoveIDs.forEach((customerID) => {
    newCustomers = removeCustomer(newCustomers, customerID);
  });
  return newCustomers;
};
