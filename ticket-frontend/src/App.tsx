import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { createRouter } from './create-router'
import './App.css';
import { CircularProgress } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

const router = createRouter();



function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#E63946',
      },
      secondary:{
        main: '#920b17'
       }
    },
  });
  

  return (
    <ThemeProvider theme={theme}>
    <div>
      <React.Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
    </ThemeProvider>
  );
}

export default App;
