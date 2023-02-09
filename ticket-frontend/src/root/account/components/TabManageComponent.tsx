import React from 'react'
import { Box, Button, Stack, Typography, Input, Divider, Tab, Tabs, Grid } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from "react-router-dom";
import { AuthService } from '../../../modules/auth/AuthService';

const TabManageComponent = () => {

    async function onLogout() {
        await AuthService.logout();
    }

    return (
        <Box style={{ width: '100%' }}>
            <Grid container direction="row" padding={2}
                justifyContent="start"
                alignItems="center">
                <Grid item>
                    <Button color='error' variant='contained' onClick={onLogout}>Αποσύνδεση</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TabManageComponent