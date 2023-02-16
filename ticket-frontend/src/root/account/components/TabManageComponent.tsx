import React, { useEffect, useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { AuthService } from '../../../modules/auth/AuthService';
import LogoutConfirmationDialogComponent from './LogoutConfirmationDialogComponent';
import { GlobalState } from '../../../modules/core/global-state';

const TabManageComponent = () => {
    const [isLogoutConfirmationDialogOpen, setIsLogoutConfirmationDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!GlobalState.instance.loggedUser) {
            navigate('/')
        }
    }, [])

    async function onLogoutConfirm() {
        await AuthService.logout();
        setIsLogoutConfirmationDialogOpen(false);
    }

    async function onAccountManagement() {
        await AuthService.accountManagement();
    }

    return (
        <Box style={{ width: '100%' }}>
            <Grid container direction="row" padding={2} spacing={2}
                justifyContent="start"
                alignItems="center">
                <Grid item>
                    <Button color='info' variant='contained' onClick={onAccountManagement}>Διαχείριση Λογαριασμού</Button>
                </Grid>
                <Grid item>
                    <Button color='error' variant='contained' onClick={() => setIsLogoutConfirmationDialogOpen(true)}>Αποσύνδεση</Button>
                </Grid>

            </Grid>

            {isLogoutConfirmationDialogOpen && (
                <LogoutConfirmationDialogComponent open={isLogoutConfirmationDialogOpen}
                    onCancel={() => setIsLogoutConfirmationDialogOpen(false)}
                    onConfirm={onLogoutConfirm}
                ></LogoutConfirmationDialogComponent>
            )}

        </Box >
    )
}

export default TabManageComponent