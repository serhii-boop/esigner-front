import {CoursesType} from "../../types/main";
import React, {useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {changeCertificateLayout, downloadCertificateLayout, uploadCertificateLayout} from "../../services/main";
import {styled} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import './CoursesTable.css';

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


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'courseName', headerName: 'Назва курсу', width: 150 },
  { field: 'beginningCourseTime', headerName: 'Дата початку курсу', width: 200 , valueFormatter: (params) => {
      const date = new Date(params.value as string);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return formattedDate;
    },
  },
  {field: 'pdfTemplateId', headerName: 'Шаблон сертифікату', width: 400, renderCell: (params) => {
      const { pdfTemplateId } = params.row;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
        uploadCertificateLayout(uploadedFile as File, params.row.id)
          .then(() => {
            setUploadedFile(null);
            toast.success('File uploaded successfully!');
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.msg);
            setUploadedFile(null);
          });
      }

      const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        const file = event.target.files[0];

        if (file) {
          changeCertificateLayout(file, pdfTemplateId)
            .then(() => {
              toast.success('Сертифікат успішно замінений!');
            })
            .catch(() => {
              toast.error('Помилка заміни сертифікату!');
            });
        }
      }

      const handleDownloadFile = () => {
        downloadCertificateLayout(params.row.id)
      }

      return (
        <div>
          {pdfTemplateId ? (
            <div className={'action-container'}>
            <Button onClick={handleDownloadFile}>
              Переглянути сертифікат
            </Button>
            <Button className={'change-button'} component="label">
              Замінити
              <VisuallyHiddenInput type="file" accept={".pdf"} onChange={handleChangeFile}/>
            </Button>
            </div>
          ) : (
            <div>
              {uploadedFile ? (
                <div>
                  <span style={{ marginLeft: '8px' }}>{uploadedFile.name}</span>
                  <Button onClick={()=> {handleSendFile()}}>
                    Надіслати
                  </Button>
                  <IconButton aria-label="delete" size="large" onClick={handleDeleteFile}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ) : (
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ width: 220}} >
                  Завантажити файл
                  <VisuallyHiddenInput type="file" accept={".pdf"} onChange={handleFileChange}/>
                </Button>
                )}
            </div>
          )}
        </div>
      );
    },
  },
  {
    field: 'action', headerName: 'Дії', width: 600, renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();
      return (
        <div className={'buttonContainer'}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/add-course-participants/${params.row.id}`);
            }}
          >
            Додати учасників курсу
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
               navigate(`/course-participants/${params.row.id}`);
            }}
            >
            Переглянути учасників курсу
          </Button>
        </div>
      )
    }
  },
];

interface Props {
    courses: CoursesType[];
}
export const CoursesTable: React.FC<Props> = ({courses}) => {
  const filteredCourses = courses.map(({ course, pdfTemplateId }) => ({ ...course, pdfTemplateId }));

  return (
    <div style={{ height: 'auto', width: 'fit-content' }}>
      <DataGrid
        rows={filteredCourses}
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
}