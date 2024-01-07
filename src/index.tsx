import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 	ukUA } from '@mui/material/locale';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ukUA,
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
    <App />
      <ToastContainer />
    </ThemeProvider>
);
