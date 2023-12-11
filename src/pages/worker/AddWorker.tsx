import {addWorker} from "../../services/main";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {toast} from "react-toastify";

export const AddWorker = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstName: yup.string().required('Імʼя є обовʼязковим'),
    lastName: yup.string().required('Прізвище є обовʼязковим'),
    role: yup.string().required('Роль є обовʼязковою'),
    email: yup.string().email('Введіть коректну електронну пошту').required('Електронна пошта є обовʼязковою'),
    password: yup.string().required('Пароль є обовʼязковим'),
  });

  try {
    validationSchema.validateSync({
      email: 'test@example.com',
      password: 'secret',
    });
  } catch (error) {
    console.error('Помилка валідації:');
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('role', (event.target as HTMLInputElement).value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      addWorker(values).then(() => {
        toast.success(`Працівнику ${formik.values.firstName} ${formik.values.lastName} надіслано пароль на електронну пошту ${formik.values.email}`)
        setTimeout(() => {
          navigate('/workers');
        }, 5000);
      });
    },
  });

  return (
    <div>
      <h1>Додавання працівника</h1>
      <div className='authMainContainer'>
        <form onSubmit={formik.handleSubmit} className='authForm'>
          <label htmlFor={'firstName'}>Імʼя</label>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && (formik.errors.firstName as React.ReactNode)}
          />
          <label htmlFor={'lastName'}>Прізвище</label>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.firstName && (formik.errors.firstName as React.ReactNode)}
          />
          <label htmlFor={'email'}>Пошта</label>
          <TextField
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.firstName && (formik.errors.firstName as React.ReactNode)}
          />
          <label htmlFor={'password'}>Пароль</label>
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            autoComplete={'new-password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && (formik.errors.password as React.ReactNode)}
          />
          <FormControl>
            <label htmlFor={'role'}>Роль</label>
            <RadioGroup
              id="role"
              defaultValue={formik.values.role}
              value={formik.values.role}
              name="role"
              row
              onChange={handleRoleChange}
            >
              <FormControlLabel value="ADMIN" control={<Radio />} label="Адмін" />
              <FormControlLabel value="WORKER" control={<Radio />} label="Працівник" />
            </RadioGroup>
          </FormControl>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Створити
          </Button>
        </form>
      </div>
    </div>
  );
};
