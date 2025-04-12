import { useEffect } from 'react';
import './DataTable.css';
import {
  EOrderDirection,
  EOrderKey,
  IDataTableStatus,
} from './DataTable.models';
import { useDataTableStatus } from './hooks';
import { DEFAULT_TABLE_STATUS } from './const';
import {
  getColumnOrderIcon,
  getFilteredCustomers,
  getOrderedCustomers,
  removeCustomers,
} from './DataTable.utils';

// 3.1. PLUS
// Nel footer sono presenti i <button />

// NEW: visualizza una form per l'inserimento di un nuovo CUSTOMER

// MODIFY: visualizza la form per poter modificare il primo CUSTOMER selezionato

// Domande
// Realizzare la funzionalità (anche in questo caso non è importante la presentazione grafica).

// Come scriveresti le REST API?
function DataTable() {
  const [dataTableStatus, setDataTableStatus] =
    useDataTableStatus(DEFAULT_TABLE_STATUS);
  useEffect(() => {}, []);

  const handleSelectCustomer = (customerID: string) => {
    const selectedCustomers = [
      ...(dataTableStatus as IDataTableStatus).selectedCustomerIDs,
    ];
    const isAlreadySelected = selectedCustomers.includes(customerID);
    if (isAlreadySelected) {
      const idIndex = selectedCustomers.indexOf(customerID);
      selectedCustomers.splice(idIndex, 1);
    } else {
      selectedCustomers.push(customerID);
    }
    setDataTableStatus({
      ...dataTableStatus,
      selectedCustomerIDs: selectedCustomers,
    });
  };
  // console.log('dataTableStatus: ', dataTableStatus);
  const orderedCustomers = getOrderedCustomers(dataTableStatus);
  const filteredCustomers = getFilteredCustomers(
    dataTableStatus.filterString,
    orderedCustomers
  );
  const handleOrdering = (key: EOrderKey) => {
    setDataTableStatus({
      ...dataTableStatus,
      orderKey: key,
      orderDirection:
        dataTableStatus.orderDirection === EOrderDirection.ASC
          ? EOrderDirection.DES
          : EOrderDirection.ASC,
    });
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterString = e.target.value;
    setDataTableStatus({ ...dataTableStatus, filterString: filterString });
  };
  const handleDelete = () => {
    const { customers, selectedCustomerIDs } =
      dataTableStatus as IDataTableStatus;
    const newCustomers = removeCustomers(customers, selectedCustomerIDs);
    // console.log('newCustomers: ', newCustomers);
    setDataTableStatus({ ...dataTableStatus, customers: newCustomers });
  };

  return (
    <>
      <input
        type='text'
        onChange={(e) => {
          handleFilterChange(e);
        }}
        value={dataTableStatus.filterString}
      />
      <table>
        <thead>
          <tr>
            <th scope='col'>Select</th>
            <th scope='col'>
              <>
                <span>Name</span>
                <button
                  type='button'
                  onClick={() => {
                    handleOrdering(EOrderKey.NAME);
                  }}
                >
                  {getColumnOrderIcon(dataTableStatus, EOrderKey.NAME)}
                </button>
              </>
            </th>
            <th scope='col'>
              <>
                <span>Surname</span>
                <button
                  type='button'
                  onClick={() => {
                    handleOrdering(EOrderKey.SURNAME);
                  }}
                >
                  {getColumnOrderIcon(dataTableStatus, EOrderKey.SURNAME)}
                </button>
              </>
            </th>
            <th scope='col'>
              <>
                <span>City</span>
                <button
                  type='button'
                  onClick={() => {
                    handleOrdering(EOrderKey.CITY);
                  }}
                >
                  {getColumnOrderIcon(dataTableStatus, EOrderKey.CITY)}
                </button>
              </>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => {
            return (
              <tr key={customer.uuid}>
                <th scope='row'>
                  <input
                    type='checkbox'
                    onChange={() => {
                      handleSelectCustomer(customer.uuid);
                    }}
                    checked={(
                      dataTableStatus as IDataTableStatus
                    ).selectedCustomerIDs.includes(customer.uuid)}
                  />
                </th>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.address.city}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <td>
              <button type='button' onClick={handleDelete}>
                DELETE
              </button>
            </td>
            <td>
              <button type='button' onClick={handleNew}>
                NEW
              </button>
            </td>
            <td>
              <button type='button'>MODIFY</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default DataTable;
