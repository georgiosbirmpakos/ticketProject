import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { createRouter } from './create-router'
import './App.css';
import { CircularProgress } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const router = createRouter();



function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#E63946',
            },
            secondary: {
                main: '#920b17'
            }
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <React.Suspense fallback={<CircularProgress />}>
                    <RouterProvider router={router} />
                </React.Suspense>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
