import * as yup from "yup";
import {useFormik} from "formik";
import {addCourseParticipant} from "../../services/main";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import { Button, TextField} from "@mui/material";
import {toast} from "react-toastify";

const validationSchema = yup.object({
  firstName: yup.string().required('Імʼя є обовʼязковою'),
  lastName: yup.string().required('Прізвище є обовʼязковим'),
  grade: yup.string().required('Оцінка є обовʼязковою'),
  certificateNumber: yup.string().required('Номер сертифікату є обовʼязковим'),
});

export const AddParticipant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phone: '',
      grade: '',
      certificateNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addCourseParticipant(id as string, values).then(() => {
        toast.success('Учасника успішно додано');
        setTimeout(() => {
          navigate('/courses');
        }, 3000);
      })
        .catch(() => {
          toast.error('Помилка додавання учасника');
        });
    },
  });

  return (
    <div>
      <h1>Додавання учасників курсу</h1>
      <div className='authMainContainer'>
        <form onSubmit={formik.handleSubmit} className='authForm'>
          <label htmlFor={'firstName'}>Імʼя</label>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <label htmlFor={'lastName'}>Прізвище</label>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <label htmlFor={'middleName'}>По батькові</label>
          <TextField
            fullWidth
            id="middleName"
            name="middleName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.middleName}
          />
          <label htmlFor={'email'}>Електронна пошта</label>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <label htmlFor={'phone'}>Телефон</label>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <label htmlFor={'grade'}>Оцінка</label>
          <TextField
            fullWidth
            id="grade"
            name="grade"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.grade}
            error={formik.touched.grade
            && Boolean(formik.errors.grade)}
            helperText={formik.touched.grade && formik.errors.grade}
          />
          <label htmlFor={'certificateNumber'}>Номер сертифікату</label>
          <TextField
            fullWidth
            id="certificateNumber"
            name="certificateNumber"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.certificateNumber}
            error={formik.touched.certificateNumber
            && Boolean(formik.errors.certificateNumber)}
            helperText={formik.touched.certificateNumber && formik.errors.certificateNumber}
          />
          <Button type="submit" variant="contained" color="primary">
            Додати
          </Button>
        </form>
    </div>
    </div>
  )
}