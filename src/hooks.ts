import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { DATA_TABLE_STATUS_STORAGE_KEY } from './const';
import { IDataTableStatus } from './components/DataTable/DataTable.models';

export const useDataTableStatus = (
  defaultValue: IDataTableStatus
): [IDataTableStatus, Dispatch<SetStateAction<IDataTableStatus>>] => {
  const [storedDataTableStatus, setStoredDataTableStatus] =
    useState<IDataTableStatus>(() => {
      const storedValue = sessionStorage.getItem(DATA_TABLE_STATUS_STORAGE_KEY);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

  useEffect(() => {
    sessionStorage.setItem(
      DATA_TABLE_STATUS_STORAGE_KEY,
      JSON.stringify(storedDataTableStatus)
    );
  }, [storedDataTableStatus]);

  return [storedDataTableStatus, setStoredDataTableStatus];
};
