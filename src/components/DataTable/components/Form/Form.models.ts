import { IDataTableStatus } from '../../DataTable.models';

export interface IFormProps {
  dataTableStatus: IDataTableStatus;
  setDataTableStatus: React.Dispatch<React.SetStateAction<IDataTableStatus>>;
}
