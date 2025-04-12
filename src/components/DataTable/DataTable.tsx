import './DataTable.css';
import { EFormOperation, EOrderDirection, EOrderKey } from './DataTable.models';
import { useDataTableStatus } from '../../hooks';
import { DEFAULT_TABLE_STATUS } from '../../const';
import {
  getColumnOrderIcon,
  getFilteredCustomers,
  getFirstSelectedCustomerFormData,
  getOrderedCustomers,
  removeCustomers,
} from './DataTable.utils';
import { Form } from './components/Form/Form';

// Come scriveresti le REST API?
export const DataTable = () => {
  const [dataTableStatus, setDataTableStatus] =
    useDataTableStatus(DEFAULT_TABLE_STATUS);

  const orderedCustomers = getOrderedCustomers(dataTableStatus);
  const filteredCustomers = getFilteredCustomers(
    dataTableStatus.filterString,
    orderedCustomers
  );

  const handleSelectCustomer = (customerID: string) => {
    const selectedCustomers = [...dataTableStatus.selectedCustomerIDs];
    const isAlreadySelected = selectedCustomers.includes(customerID);
    if (isAlreadySelected) {
      const idIndex = selectedCustomers.indexOf(customerID);
      selectedCustomers.splice(idIndex, 1);
    } else {
      selectedCustomers.push(customerID);
    }
    setDataTableStatus((prevState) => ({
      ...prevState,
      selectedCustomerIDs: selectedCustomers,
    }));
  };

  const handleOrdering = (key: EOrderKey) => {
    setDataTableStatus((prevState) => ({
      ...prevState,
      orderKey: key,
      orderDirection:
        prevState.orderDirection === EOrderDirection.ASC
          ? EOrderDirection.DES
          : EOrderDirection.ASC,
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterString = e.target.value;
    setDataTableStatus((prevState) => ({
      ...prevState,
      filterString: filterString,
    }));
  };

  const handleDeleteClick = () => {
    const { customers, selectedCustomerIDs } = dataTableStatus;
    const newCustomers = removeCustomers(customers, selectedCustomerIDs);
    setDataTableStatus((prevState) => ({
      ...prevState,
      customers: newCustomers,
    }));
  };

  const handleNewClick = () => {
    setDataTableStatus((prevState) => ({
      ...prevState,
      showForm: true,
      formData: DEFAULT_TABLE_STATUS.formData,
      formOperation: EFormOperation.ADD,
    }));
  };

  const handleEditClick = () => {
    const { firstSelectedCustomerID, firstSelectedCustomerFormData } =
      getFirstSelectedCustomerFormData(
        filteredCustomers,
        dataTableStatus.selectedCustomerIDs
      );
    setDataTableStatus((prevState) => ({
      ...prevState,
      showForm: true,
      formOperation: EFormOperation.EDIT,
      formData: firstSelectedCustomerFormData,
      editingCustomerID: firstSelectedCustomerID,
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
                    checked={dataTableStatus.selectedCustomerIDs.includes(
                      customer.uuid
                    )}
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
              <button type='button' onClick={handleDeleteClick}>
                DELETE
              </button>
            </td>
            <td>
              <button type='button' onClick={handleNewClick}>
                NEW
              </button>
            </td>
            <td>
              <button type='button' onClick={handleEditClick}>
                MODIFY
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      {dataTableStatus.showForm && (
        <Form
          dataTableStatus={dataTableStatus}
          setDataTableStatus={setDataTableStatus}
        />
      )}
    </>
  );
};

export default DataTable;
