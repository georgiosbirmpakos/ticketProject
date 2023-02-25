import React from 'react';
import { createRouter } from './create-router'
import './App.css';
import { Box, CircularProgress } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const router = createRouter();



function App() {

    return (

        <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackbarProvider maxSnack={3}>
                <React.Suspense fallback={<CircularProgress />}>
                    <Box style={{ minWidth: '400px', minHeight: '400px' }}>
                        <RouterProvider router={router} />
                    </Box>
                </React.Suspense>
            </SnackbarProvider>
        </LocalizationProvider>
    );
}

export default App;
