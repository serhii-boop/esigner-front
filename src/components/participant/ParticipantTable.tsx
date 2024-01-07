import {GridColDef, GridRowSelectionModel} from "@mui/x-data-grid";
import {DataGrid} from "@mui/x-data-grid";
import {ParticipantType} from "../../types/main";
import React, {useState} from "react";
import {Button, styled} from "@mui/material";
import {Modal} from "@mui/material";
import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {TextField} from "@mui/material";
import {openCertificate, signedCertificates} from "../../services/main";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Імʼя', width: 150 },
  { field: 'lastName', headerName: 'Прізвище', width: 150 },
  { field: 'middleName', headerName: 'По-батькові', width: 150 },
  { field: 'email', headerName: 'Електронна пошта', width: 200 },
  { field: 'phone', headerName: 'Номер телефону', width: 200 },
  { field: 'grade', headerName: 'Оцінка', width: 150 },
  { field: 'certificateNumber', headerName: 'Номер сертифікату', width: 200 },
];

const signedColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Імʼя', width: 150 },
  { field: 'lastName', headerName: 'Прізвище', width: 150 },
  { field: 'middleName', headerName: 'По-батькові', width: 150 },
  { field: 'email', headerName: 'Електронна пошта', width: 200 },
  { field: 'phone', headerName: 'Номер телефону', width: 200 },
  { field: 'grade', headerName: 'Оцінка', width: 150 },
  { field: 'certificateNumber', headerName: 'Номер сертифікату', width: 200},
  { field: 'certificate', headerName: 'Сертифікат', width: 250, renderCell: (params) => {
    const handleOpenCertificate = () => {
      openCertificate(params.row.certificateNumber)
      }

      return <Button onClick={handleOpenCertificate}>Переглянути сертифікат</Button>
  }
  },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ParticipantsTable: React.FC<{assignedParticipants: ParticipantType[], unassignedParticipants: ParticipantType[]}> = ({assignedParticipants, unassignedParticipants}) => {
  const [selectedUnassignedParticipants, setSelectedUnassignedParticipants] = useState<GridRowSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<Uint8Array | null>(null);
  const [uncodedFile, setUncodedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const handleUnassignedSelectionChange = (params: GridRowSelectionModel ) => {
    setSelectedUnassignedParticipants(params);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      setUncodedFile(file);

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const result = e.target.result;
          const byteArray = result instanceof ArrayBuffer ? new Uint8Array(result) : new Uint8Array(0);
          setUploadFile(byteArray);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDeleteFile = () => {
    setUploadFile(null);
    setUncodedFile(null);
  };

  const handleAssignCertificates = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!uploadFile) {
      toast.error('Завантажте файл');
      return;
    }
    if (!password) {
      toast.error('Введіть пароль');
      return;
    }

    signedCertificates(uploadFile, password, id as string, selectedUnassignedParticipants as number[]).then(() => {
      toast.success('Сертифікати підписано успішно');
      handleClose();
    }).catch((error) => {
      toast.error(error.response.data.msg);
    })
      .finally(() => {
        window.location.reload();
        setUploadFile(null);
      }
    );
  }

  return (
  <div>
    <div style={{ height: 'auto', width: 'fit-content' , marginBottom: 20}}>
      {unassignedParticipants && unassignedParticipants.length > 0 && (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10, height: 40}}>
        <h2 style={{marginBottom: 0}}>Учасники з непідписаними сертифікатами</h2>
          {selectedUnassignedParticipants && selectedUnassignedParticipants.length > 0 && (
          <Button
            variant='outlined'
            onClick={handleModalOpen}
          >
            Підписати сертифікати
          </Button>
            )}
        </div>
        <DataGrid
          rows={unassignedParticipants}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={handleUnassignedSelectionChange}
        />
      </div>
      )}
    </div>
    <div style={{ height: 'auto', width: 'fit-content' }}>
      {assignedParticipants && assignedParticipants.length > 0 && (
        <div>
      <h2>Учасники з підписаними сертифікатами</h2>
      <DataGrid
        rows={assignedParticipants}
        columns={ signedColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </div>
      )}
    </div>
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Для підпису сертифікату завантажте файл із розширенням .p12
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: 220}} >
            Завантажити файл
            <VisuallyHiddenInput type="file" accept={".p12"} onChange={handleFileChange}/>
          </Button>
          {uploadFile && (
            <div>
              {uncodedFile?.name}
              <IconButton aria-label="delete" size="large" onClick={handleDeleteFile}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          )}
        </Typography>
        {uploadFile && (
        <form onSubmit={handleAssignCertificates}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Введіть пароль до електронного підпису</Typography>
          <TextField
            type="password"
            id="password"
            name="password"
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant="contained"
          type={"submit"}
          style={{marginTop: 20}}
        >
          Підписати сертифікати
        </Button>
        </div>
        </form>
        )}
      </Box>
    </Modal>
  </div>
  )
}