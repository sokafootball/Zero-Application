import { ICustomer } from './DataTable.models';

export const initialCustomers: ICustomer[] = [
  {
    uuid: '0',
    name: 'Mario',
    surname: 'Rossi',
    address: {
      city: 'Venezia',
      street: 'Ca Dorsoduro',
    },
  },
  {
    uuid: '1',
    name: 'Luigi',
    surname: 'Pendo',
    address: {
      city: 'Torino',
      street: 'Ca Dorsoduro',
    },
  },
  {
    uuid: '2',
    name: 'Rosa',
    surname: 'Salva',
    address: {
      city: 'Belluno',
      street: 'Ca Dorsoduro',
    },
  },
];
