import React from 'react'
import {Box, Button, Stack, Typography, Input, TextField} from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ThemeProvider } from '@emotion/react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
  return (
    <React.Fragment>

        {/* Create different divs for different screen sizes */}

        <div style={{height:'50vh', display:'flex', alignContent:'center', justifyContent:'center'}}>
        <Box sx={{width:'40%',marginTop:2, marginBottom:2, border:1, borderRadius:2}}>
        
        <Stack direction={'column'} alignContent='center' alignItems={'center'}>

            <Typography style={{marginTop:10}} variant='h5'> MovieScape </Typography>
            <Typography style={{marginTop:10}} fontWeight={'bold'}> Συνέχεια με τον λογαριασμό σου </Typography>
            <Typography style={{marginLeft:5, marginTop:10}} fontWeight='normal' variant='subtitle2'> Κάνε σύνδεση ή εγγραφή με έναν από τους παρακάτω τρόπους </Typography>
            <Input color='primary' style={{marginTop:10, width:'50%'}} placeholder="Email" inputProps={{inputMode: 'email'}}/>

            <Input placeholder='Password' sx={{width:'50%', marginTop:2, marginBottom:2}} 
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
            sx={{ ":hover": { backgroundColor: '#920b17' }, 
            borderRadius: 15, backgroundColor: '#E63946', height: 40, width: '50%', marginTop:2 }} >ΣΥΝΔΕΣΗ</Button>
        </Stack>
        </Box>
        </div>
    </React.Fragment>        
  )
}

export default LoginPage