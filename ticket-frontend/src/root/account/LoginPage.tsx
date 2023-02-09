import React from 'react'
import { Box, Button, Stack, Typography, Input, Divider, Theme } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ThemeProvider } from '@emotion/react';
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <React.Fragment>

            {/* Create different divs for different screen sizes */}
            <div style={{ minHeight: '80vh', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: { xs: '70%', md: '40%', lg: '30%', xl: '20%' }, marginTop: 2, marginBottom: 2, border: 0.5, borderRadius: 2, boxShadow: 2 }}>

                    <Stack direction={'column'} alignContent='center' alignItems={'center'}>

                        <Typography style={{ marginTop: 10 }} variant='h5'> MovieScape </Typography>
                        <Typography style={{ marginTop: 10 }} fontWeight={'bold'}> Συνέχεια με τον λογαριασμό σου </Typography>
                        <Typography style={{ marginTop: 10, wordWrap: 'break-word', textAlign: 'center' }} fontWeight='normal' variant='subtitle2'> Κάνε σύνδεση ή εγγραφή με έναν από τους παρακάτω τρόπους </Typography>
                        <Input color='primary' style={{ marginTop: 10, width: '60%' }} placeholder="Email" inputProps={{ inputMode: 'email' }} />

                        <Input placeholder='Password' sx={{ width: '60%', marginTop: 2, marginBottom: 2 }}
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Button variant='contained'
                            sx={{
                                ":hover": { backgroundColor: '#920b17' },
                                borderRadius: 15, backgroundColor: '#E63946', height: 40, width: '60%'
                            }} >ΣΥΝΔΕΣΗ</Button>

                        <Button color="primary" sx={{ marginTop: 1, height: 40, textTransform: 'none' }}>Ξέχασες τον κωδικό σου;</Button>


                    </Stack>
                    <Divider variant='middle' sx={{ marginTop: 1 }}>ή</Divider>
                    <Stack direction={'column'} alignContent='center' alignItems={'center'}>
                        <Button variant='contained'
                            sx={{ ":hover": { backgroundColor: '#E63946', color: 'white' }, backgroundColor: 'white', color: '#E63946', borderRadius: 15, height: 40, width: '60%', marginTop: 1, marginBottom: 1, justifyContent: 'flex' }} >
                            <GoogleIcon />
                            <Typography variant='subtitle2' fontWeight='normal' textTransform={'none'}>Σύνδεση μέσω Google</Typography>
                        </Button>
                    </Stack>
                    <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Button color="primary" sx={{ height: 40, textTransform: 'none' }} component={Link} to={'/signup'} >Δημιουργία Λογαριασμού</Button>
                    </Box>

                </Box>
            </div>
        </React.Fragment>
    )
}

export default LoginPage