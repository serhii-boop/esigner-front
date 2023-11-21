import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './WorkersTable.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {deleteWorker} from "../../services/main";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Імʼя', width: 150 },
  { field: 'lastName', headerName: 'Прізвище', width: 150 },
  { field: 'email', headerName: 'Електронна пошта', width: 200 },
  { field: 'role', headerName: 'Роль', width: 130 },
  {
    field: 'actions',
    headerName: 'Дії',
    width: 300,
    renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isModalOpen, setModalOpen] = useState(false);

      const handleDelete = () => {
        deleteWorker(params.row.id).then(() => {
          setModalOpen(false);
          window.location.reload();
        });
      };

      const modalContent = (
        <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Видалення</DialogTitle>
          <DialogContent>
            Ви впевнені, що хочете видалити цього працівника?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)} color="primary">
              Скасувати
            </Button>
            <Button onClick={handleDelete} color="error">
              Видалити
            </Button>
          </DialogActions>
        </Dialog>
      );

      return (
        <div className={'buttonContainer'}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/edit/${params.row.id}`);
            }}
            className={'editButton'}
          >
            Редагувати
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Видалити
          </Button>

          {modalContent}
        </div>
      );
    },
  },
];

interface Props {
  workers: WorkerType[];
}

export const WorkersTable: React.FC<Props> = ({ workers }) => {
  return (
    <div style={{ height: 'auto', width: 'fit-content' }}>
      <DataGrid
        rows={workers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
