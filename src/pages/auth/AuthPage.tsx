import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import './Auth.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { URL } from '../../constants';

export const auth = async (email: string, password: string) => {
    const { data } = await axios.post(`${URL}/api/v1/auth/authenticate`, {
        email,
        password,
    });
    Cookies.set('jwt-token', data.token, { secure: true });
    return data;
}


export const AuthComponent: React.FC = () => {
    const navigate = useNavigate();

    const validationSchema = yup.object({
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            auth(values.email, values.password).then(() => {
                navigate('/welcome');
            });
        },
    });

    return (
      <div className='authMainContainer'>
          <form onSubmit={formik.handleSubmit} className='authForm'>
              <label htmlFor={'email'}>Пошта</label>
              <TextField
                fullWidth
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <label htmlFor={'password'}>Пароль</label>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button color="primary" variant="contained" fullWidth type="submit">
                  Увійти
              </Button>
          </form>
      </div>
    );
};

