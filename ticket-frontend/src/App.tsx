import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { CircularProgress } from '@mui/material';
import { createRouter } from './create-router';


const router = createRouter();

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <RootPage></RootPage> */}
      <React.Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
