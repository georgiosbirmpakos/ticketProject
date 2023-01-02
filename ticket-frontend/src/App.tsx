import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { Button, CircularProgress, Typography, Divider } from '@mui/material';
import { createRouter } from './create-router'
import './App.css'; 

const router = createRouter();

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976D2',
      },
    },
  });

  return (
    <div>
    <React.Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  );
}

export default App;
