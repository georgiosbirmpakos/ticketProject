import React from 'react'
import { Box, Button, Stack, Typography, Input, Divider, Tab, Tabs } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from "react-router-dom";
import TabManageComponent from './components/TabManageComponent';

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [value, setValue] = React.useState(0);

    const tabs = [
        {
            name: 'Διαχείριση',
            // to: '/admin/movies'
        },
        {
            name: 'Λεπτομέριες',
            // to: '/admin/providers'
        },
        {
            name: 'Εισιτήρια',
            // to: '/admin/halls'
        },
    ];

    return (
        <Box style={{ width: '100%', height: '100%' }}>

            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} aria-label="nav tabs example">
                    {tabs.map((tab, index) =>
                        <Tab key={index}
                            // component={Link}
                            // to={tab.to}
                            label={tab.name}
                        />
                    )}

                </Tabs>
            </Box>
            <br />

            {value === 0 && (
                <Box sx={{ width: '100%' }}>
                    <TabManageComponent></TabManageComponent>
                </Box>
            )}
            {value === 1 && (
                <Box sx={{ width: '100%' }}>
                    tab 1
                </Box>
            )}
            {value === 2 && (
                <Box sx={{ width: '100%' }}>
                    tab 2
                </Box>
            )}
        </Box>
    )
}

export default LoginPage