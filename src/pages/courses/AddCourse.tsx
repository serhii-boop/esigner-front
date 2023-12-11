import {useNavigate} from "react-router-dom";
import React from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {addCourse} from "../../services/main";
import { Button, TextField} from "@mui/material";
import './Courses.css';
import {toast} from "react-toastify";

const validationSchema = yup.object({
  courseName: yup.string().required('Назва є обовʼязковою'),
  courseDescription: yup.string().required('Опис є обовʼязковим'),
  beginningCourseTime: yup.string().required('Дата початку є обовʼязковою'),
  endingCourseTime: yup.string().required('Дата закінчення є обовʼязковою'),
  creditEKTS: yup.string().required('Кількість кредитів EKTS є обовʼязковою'),
  durationInHours: yup.string().required('Тривалість в годинах є обовʼязковою'),
});
export const AddCourse = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      courseName: '',
      courseDescription: '',
      competence: '',
      beginningCourseTime: '',
      endingCourseTime: '',
      creditEKTS: '',
      durationInHours: '',
      linkOfCourseApproval: '',
      programApprovalYear: '',
      programType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        creditEKTS: Number(values.creditEKTS),
        durationInHours: Number(values.durationInHours),
        programApprovalYear: Number(values.programApprovalYear),
        beginningCourseTime: new Date(values.beginningCourseTime).toISOString(),
        endingCourseTime: new Date(values.endingCourseTime).toISOString(),
      };
      addCourse(formattedValues).then(() => {
        toast.success('Курс успішно додано');
        setTimeout(() => {
          navigate('/courses');
        }, 5000);
      })
        .catch(() => {
          toast.error('Помилка додавання курсу')
        });
    },
  });

  return (
    <div>
      <h1>Додавання курсу</h1>
      <div>
        <form onSubmit={formik.handleSubmit} className='course-form'>
          <div className="form-container">
            <div className="form-column">
          <label htmlFor={'courseName'}>Назва курсу</label>
          <TextField
            fullWidth
            id="courseName"
            name="courseName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.courseName}
            error={!!(formik.errors.courseName && formik.touched.courseName)}
            helperText={formik.touched.courseName && (formik.errors.courseName as React.ReactNode)}
          />
          <label htmlFor={'courseDescription'}>Опис курсу</label>
          <TextField
            fullWidth
            id="courseDescription"
            name="courseDescription"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.courseDescription}
            error={!!(formik.errors.courseDescription && formik.touched.courseDescription)}
            helperText={formik.touched.courseDescription && (formik.errors.courseDescription as React.ReactNode)}
          />
          <label htmlFor={'competence'}>Компетенції</label>
          <TextField
            fullWidth
            id="competence"
            name="competence"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.competence}
          />
          <label htmlFor={'beginningCourseTime'}>Дата початку курсу</label>
          <TextField
            fullWidth
            id="beginningCourseTime"
            name="beginningCourseTime"
            type="date"
            onChange={(event) =>
              formik.setFieldValue("beginningCourseTime", event.target.value)
            }
          />
          <label htmlFor={'endingCourseTime'}>Дата закінчення курсу</label>
          <TextField
            fullWidth
            id="endingCourseTime"
            name="endingCourseTime"
            type="date"
            onChange={(event) =>
              formik.setFieldValue("endingCourseTime", event.target.value)
            }
          />
          </div>
            <div className="form-column">
          <label htmlFor={'creditEKTS'}>Кредити EKTS</label>
          <TextField
            fullWidth
            id="creditEKTS"
            name="creditEKTS"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.creditEKTS}
            error={!!(formik.errors.creditEKTS && formik.touched.creditEKTS)}
            helperText={formik.touched.creditEKTS && (formik.errors.creditEKTS as React.ReactNode)}
          />
          <label htmlFor={'durationInHours'}>Тривалість в годинах</label>
          <TextField
            fullWidth
            id="durationInHours"
            name="durationInHours"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.durationInHours}
            error={!!(formik.errors.durationInHours && formik.touched.durationInHours)}
            helperText={formik.touched.durationInHours && (formik.errors.durationInHours as React.ReactNode)}
          />
          <label htmlFor={'linkOfCourseApproval'}>Посилання на погодження курсу</label>
          <TextField
            fullWidth
            id="linkOfCourseApproval"
            name="linkOfCourseApproval"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.linkOfCourseApproval}
          />
          <label htmlFor={'programApprovalYear'}>Рік погодження програми</label>
          <TextField
            fullWidth
            id="programApprovalYear"
            name="programApprovalYear"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.programApprovalYear}
          />
          <label htmlFor={'programType'}>Тип програми</label>
          <TextField
            fullWidth
            id="programType"
            name="programType"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.programType}
          />
              <Button color="primary" variant="contained" type="submit" fullWidth sx={{marginTop:1}}>
                Додати
              </Button>
          </div>
          </div>
        </form>
    </div>
    </div>
  )
}