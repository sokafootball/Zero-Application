import { useState, useEffect } from 'react';
import { DATA_TABLE_STATUS_STORAGE_KEY } from './const';
import { IDataTableStatus } from './DataTable.models';

export const useDataTableStatus = (defaultValue: IDataTableStatus) => {
  const [state, setState] = useState(() => {
    const storedValue = sessionStorage.getItem(DATA_TABLE_STATUS_STORAGE_KEY);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(
      DATA_TABLE_STATUS_STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [state]);

  return [state, setState];
};
