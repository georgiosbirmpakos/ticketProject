import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MovieIcon from '@mui/icons-material/Movie';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import TheatersIcon from '@mui/icons-material/Theaters';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';

// label: 'Διαχείριση',
//             to: '/admin',
//             icon: <AdminPanelSettingsIcon />

type Anchor = 'left';
type Props = {
    isDark: boolean
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TemporaryDrawer({ isDark, setIsDark }: Props) {
    const changeTheme = () => {
        setIsDark(!isDark);
        console.log(isDark)
    };


    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const routes: { [key: string]: string } = {
        'Αρχική': '/',
        'Ταινίες': '/movies',
        'Προβολές': '/events',
        'Διαχείριση': '/admin',
        'Σχετικά': '/about'
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Αρχική', 'Ταινίες', 'Προβολές', 'Διαχείριση', 'Σχετικά'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={routes[text]} onClick={toggleDrawer(anchor, false)}>
                            <ListItemIcon>
                                {text === 'Αρχική' && <ConfirmationNumberIcon />}
                                {text === 'Ταινίες' && <MovieIcon />}
                                {text === 'Προβολές' && <CameraRollIcon />}
                                {text === 'Διαχείριση' && <AdminPanelSettingsIcon />}
                                {text === 'Σχετικά' && <InfoIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={changeTheme}>
                        <ListItemIcon>
                            {isDark ? <Brightness5Icon /> : <DarkModeIcon />}
                        </ListItemIcon>
                        <ListItemText primary='Αλλαγή Θέματος' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)} >
                        <MenuIcon >
                        </MenuIcon>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}