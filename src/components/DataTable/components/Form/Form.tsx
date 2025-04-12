import { DEFAULT_TABLE_STATUS } from '../../../../const';
import {
  EFormOperation,
  IDataTableStatus,
  IFormData,
} from '../../DataTable.models';
import { addCustomer, editCustomer } from '../../DataTable.utils';
import { IFormProps } from './Form.models';
import './Form.css';

export const Form = ({ dataTableStatus, setDataTableStatus }: IFormProps) => {
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
    if (dataTableStatus.formOperation === EFormOperation.ADD) {
      const newCustomerID = ++dataTableStatus.customerIDCounter;
      const newCustomers = addCustomer(
        dataTableStatus,
        newCustomerID.toString()
      );
      setDataTableStatus((prevState: IDataTableStatus) => ({
        ...prevState,
        customerIDCounter: newCustomerID,
        customers: newCustomers,
        showForm: false,
        formData: DEFAULT_TABLE_STATUS.formData,
      }));
    } else {
      const newCustomers = editCustomer(dataTableStatus);
      setDataTableStatus((prevState: IDataTableStatus) => ({
        ...prevState,
        customers: newCustomers,
        showForm: false,
        formData: DEFAULT_TABLE_STATUS.formData,
        editingCustomerID: undefined,
      }));
    }
  };
  return (
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
  );
};
