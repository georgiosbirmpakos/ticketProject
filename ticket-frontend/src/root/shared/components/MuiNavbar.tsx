import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tooltip } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import React from 'react'
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
import { AuthService } from '../../../modules/auth/AuthService';
import { GlobalState } from '../../../modules/core/global-state';
import { LoggedUserDetailsDto } from '../../../modules/auth/logged-user-details-dto';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useLocation } from 'react-router-dom'
import { RoleEnum } from '../../../modules/auth/role-enum';

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
    const [loggedUser, setLogged] = useState<LoggedUserDetailsDto | null>(GlobalState.instance.loggedUser);
    const location = useLocation();

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
            label: 'ΤΑΙΝΙΕΣ',
            to: '/movies',
            icon: <MovieIcon />
        },
        {
            label: 'ΚΑΤΑΣΤΗΜΑΤΑ',
            to: '/providers',
            icon: <LocationCityIcon />
        },
        {
            label: 'ΠΡΟΒΟΛΕΣ',
            to: '/events',
            icon: <CameraRoll />
        }
    ];

    if (loggedUser?.roles.includes(RoleEnum.TICKET_ADMIN)) {
        navbarLeftButtonsData.push({
            label: 'ΔΙΑΧΕΙΡΙΣΗ',
            to: '/admin',
            icon: <AdminPanelSettingsIcon />
        })
    }

    async function onLoginClicked() {
        await AuthService.login();
    }

    return (
        <ThemeProvider theme={isDarkTheme ? dark : light}>
            <AppBar position='static'>

                {/* pushing to left and right of the screen */}
                <Toolbar style={{ justifyContent: 'space-between' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <div>
                        {/* Icon and logo  */}
                        {navbarLeftButtonsData.map((buttonData, index) => (
                            <Button key={index}
                                className={`${(buttonData.to !== "/" && location.pathname.startsWith(buttonData.to)) ? "selectedNav" : ""}`}
                                component={Link}
                                to={buttonData.to}
                                color='inherit'
                                aria-label="logo"
                            >
                                {buttonData.icon}
                                <Typography className='logoTypo' component='div'>
                                    {buttonData.label}
                                </Typography>
                            </Button>)
                        )}
                    </div>
                    {/* Using a stack to have the other options */}
                    <Stack direction={'row'}>
                        {loggedUser ? (
                            <React.Fragment>
                                <Button className={`stackBtn ${location.pathname.startsWith("/account") ? "selectedNav" : ""}`}
                                    color='inherit' component={Link} to="/account">
                                    {loggedUser.fullName}
                                </Button>
                                <Tooltip title='Change Language'>
                                    <IconButton size="large" edge='end'>
                                        <LanguageIcon />
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className="stackBtn" color='inherit' onClick={onLoginClicked}>Είσοδος/Σύνδεση</Button>
                                <Tooltip title='Change Language'>
                                    <IconButton size="large" edge='end'>
                                        <LanguageIcon />
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                        )}


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


                    <Stack direction={'row'}>
                        {loggedUser ? (
                            <React.Fragment>
                                <Button className={`stackBtn ${location.pathname.startsWith("/account") ? "selectedNav" : ""}`}
                                    color='inherit' component={Link} to="/account">
                                    {loggedUser.fullName}
                                </Button>
                                <Tooltip title='Change Language'>
                                    <IconButton size="large" edge='end'>
                                        <LanguageIcon />
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className="stackBtn" color='inherit' onClick={onLoginClicked}>Είσοδος/Σύνδεση</Button>
                                <Tooltip title='Change Language'>
                                    <IconButton size="large" edge='end'>
                                        <LanguageIcon />
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </ThemeProvider >
    )

}

export default MuiNavbar