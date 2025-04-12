import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DataTable from './components/DataTable/DataTable.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataTable />
  </StrictMode>
);
