import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tooltip, FormControlLabel, Switch } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import React, { Dispatch, SetStateAction } from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './MuiNavbar.css'
import { Link } from "react-router-dom";
import TemporaryDrawer from "./TemporaryDrawer";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CameraRoll } from '@mui/icons-material';

// Define our custom Navbar
const light = createTheme({
    palette: {
        primary: {
            main: '#FFFF'
        }, secondary: {
            main: '#FFFF'
        },
        background: { default: 'white', paper: 'white' },
    },
});
const dark = createTheme({
    palette: {
        background: { default: 'gray' },
        mode: 'dark',
    },
});
type Props = {
    isDarkTheme: boolean
    setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const MuiNavbar = ({ isDarkTheme, setIsDarkTheme }: Props) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDark, setIsDark] = useState(prefersDarkMode);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        console.log(isDarkTheme)
    };

    const navbarLeftButtonsData = [
        {
            label: 'MovieScape',
            to: '/',
            icon: <ConfirmationNumberIcon className="navLogo" fontSize='large' />
        },
        {
            label: 'Ταινίες',
            to: '/movies',
            icon: <MovieIcon />
        },
        {
            label: 'Προβολές',
            to: '/events',
            icon: <CameraRoll />
        },
        {
            label: 'Διαχείριση',
            to: '/admin',
            icon: <AdminPanelSettingsIcon />
        }
    ];
    const settings: string[] = ['settings'];

    return (
        <ThemeProvider theme={isDarkTheme ? dark : light}>
            <AppBar position='static'>

                {/* pushing to left and right of the screen */}
                <Toolbar style={{ justifyContent: 'space-between' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <div>
                        {/* Icon and logo  */}
                        {navbarLeftButtonsData.map((buttonData, index) => (
                            <IconButton key={index} size='large'
                                component={Link}
                                to={buttonData.to}
                                edge='start'
                                color='inherit'
                                aria-label="logo">
                                {buttonData.icon}
                                <Typography className='logoTypo' component='div'>
                                    {buttonData.label}
                                </Typography>
                            </IconButton>)
                        )}
                    </div>
                    {/* Using a stack to have the other options */}
                    <Stack direction={'row'}>
                        <Button className="stackBtn" component={Link} to={'/login'} color='inherit'>Είσοδος/Σύνδεση</Button>
                        <Tooltip title='Change Language'>
                            <IconButton size="large" edge='end'>
                                <LanguageIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Change theme'>
                            <IconButton size="large" edge='end' onClick={changeTheme}>
                                {isDarkTheme ? <Brightness5Icon /> : <DarkModeIcon />}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>

                {/* Creating a toolbar for mobile devices */}
                <Toolbar style={{ justifyContent: 'space-between' }} sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <div>
                        <Stack direction={'row'}>
                            <TemporaryDrawer isDark={isDarkTheme} setIsDark={setIsDarkTheme} />
                            <IconButton>
                                <ConfirmationNumberIcon />
                            </IconButton>
                        </Stack>
                    </div>


                    {/* Using a stack to have the other options */}
                    <Stack direction={'row'}>
                        <Button className="stackBtn" component={Link} to={'/login'} color='inherit'>Είσοδος/Σύνδεση</Button>
                        <Tooltip title='Change Language'>
                            <IconButton size="large" edge='end'>
                                <LanguageIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )

}

export default MuiNavbar