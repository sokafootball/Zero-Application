import { useEffect } from 'react';
import './DataTable.css';
import {
  EFormOperation,
  EOrderDirection,
  EOrderKey,
  ICustomer,
  IDataTableStatus,
  IFormData,
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
export const DataTable = () => {
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
    setDataTableStatus({ ...dataTableStatus, customers: newCustomers });
  };
  console.log('dataTableStatus: ', dataTableStatus);

  const handleNew = () => {
    setDataTableStatus((prevState: IDataTableStatus) => ({
      ...prevState,
      showForm: true,
      formOperation: EFormOperation.ADD,
    }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formField: keyof IFormData
  ) => {
    const newFormData: IFormData = {
      ...dataTableStatus.formData,
      [formField]: e.target.value,
    };
    setDataTableStatus((prevState: IDataTableStatus) => ({
      ...prevState,
      formData: newFormData,
    }));
  };

  const handleFormSubmit = () => {
    const newCustomerID = ++(dataTableStatus as IDataTableStatus)
      .customerIDCounter;
    const { name, surname, city, street } =
      dataTableStatus.formData as IFormData;
    const newCustomer: ICustomer = {
      uuid: newCustomerID.toString(),
      name,
      surname,
      address: {
        city,
        street,
      },
    };
    const newCustomers = [...dataTableStatus.customers];
    newCustomers.push(newCustomer);
    setDataTableStatus((prevState: IDataTableStatus) => ({
      ...prevState,
      customerIDCounter: newCustomerID,
      customers: newCustomers,
      showForm: false,
      formData: DEFAULT_TABLE_STATUS.formData,
    }));
  };

  return (
    <>
      <label>Filter</label>
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
      {dataTableStatus.showForm && (
        <div className='form'>
          <label>Name</label>
          <input
            type='text'
            value={(dataTableStatus as IDataTableStatus).formData.name}
            onChange={(e) => handleFormChange(e, 'name')}
          />
          <label>Surname</label>
          <input
            type='text'
            value={(dataTableStatus as IDataTableStatus).formData.surname}
            onChange={(e) => handleFormChange(e, 'surname')}
          />
          <label>City</label>
          <input
            type='text'
            value={(dataTableStatus as IDataTableStatus).formData.city}
            onChange={(e) => handleFormChange(e, 'city')}
          />
          <label>Street</label>
          <input
            type='text'
            value={(dataTableStatus as IDataTableStatus).formData.street}
            onChange={(e) => handleFormChange(e, 'street')}
          />
          <button type='button' onClick={handleFormSubmit}>
            {dataTableStatus.formOperation}
          </button>
        </div>
      )}
    </>
  );
};

export default DataTable;
