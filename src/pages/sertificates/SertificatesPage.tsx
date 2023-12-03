import Grid from '@mui/material/Unstable_Grid2';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Alert, Button, Snackbar, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {uploadCSV, downloadTemplate} from "../../services/main";

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Сертифікати',
    width: 900,
    renderCell: (params) => (
      <a href={`#certificate-${params.row.id}`}>{params.value}</a>
    ),
  },
  { field: 'date', headerName: 'Сертифікат видано', width: 230},
];

const rows = [
  { id: 1, name: 'Сертифікати №№10713-10743, Курс "Використання змішаного навчання в процесі викладання шкільних предметів"', date: '17.11.2023 р.' },
  {id: 2, name: 'Сертифікати №№10768-10743, Курс "Використання змішаного навчання в процесі викладання шкільних предметів"', date: '7.11.2023 р.'},
  {id: 3, name: 'Сертифікати №№10713-98743, Курс "Використання змішаного навчання в процесі викладання шкільних предметів"', date: '6.10.2023 р.'},
];

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

export const SertificatesPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAlertShown, setIsAlertShown] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;
    const file = event.target.files[0];

    if (file) {
        setUploadedFile(file);
      }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
  };

  const handleSendFile = () => {
    uploadCSV(uploadedFile as File)
      .then(() => {
        setUploadedFile(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
        <div>
            <h1>Сертифікати про підвищення кваліфікації</h1>
          <Grid container spacing={10}>
            <Grid xs={8}>
              <div>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
              </div>
            </Grid>
            <Grid xs={4}>
              <h2>
                Завантажити дані про сертифікати
              </h2>
              <h3>
                Будь ласка, заповнюйте дані за наведеним нижче шаблоном
              </h3>
              <Button sx={{marginBottom:1, width: 300}} onClick={()=> {downloadTemplate()}}>
                Завантажити шаблон
              </Button>
              <div style={{display: "flex", flexDirection: 'column'}}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{marginBottom:1, width: 300}} >
                Завантажити файл
                <VisuallyHiddenInput type="file" accept={".csv"} onChange={handleFileChange}/>
              </Button>
                {uploadedFile && (
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', border: '1px solid black' , borderRadius: '10px', width: 'fit-content', gap: '5px'}}>
                    <span style={{ marginLeft: '8px' }}>{uploadedFile.name}</span>
                    <Button onClick={()=> {handleSendFile()}}>
                      Надіслати
                    </Button>
                    <IconButton aria-label="delete" size="large" onClick={handleDeleteFile}>
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <Snackbar open={isAlertShown} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert severity="success">Файл завантажено успішно!</Alert>
          </Snackbar>
        </div>
    )
}

