import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './shared/components/Footer';
import MuiNavbar from './shared/components/MuiNavbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';

const light = createTheme({
    palette: {
        primary: {
            main: '#E63946'
        }, secondary: {
            main: '#FFFF'
        },
        mode: 'light',
    },
});
const dark = createTheme({
    palette: {
        primary: {
            main: '#E63946'
        },
        mode: 'dark',
    },
});

function RootPage() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

    return (
        <React.Fragment>
            <ThemeProvider theme={isDarkTheme ? dark : light}>
                <CssBaseline />
                <MuiNavbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
                <main>
                    <Outlet />
                </main >
                <Footer />
            </ThemeProvider>
        </React.Fragment >
    );
}

export default RootPage;
