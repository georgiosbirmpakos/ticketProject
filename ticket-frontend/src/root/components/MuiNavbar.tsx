import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tooltip } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { color, textTransform } from "@mui/system";
import './MuiNavbar.css'
import { Link } from "react-router-dom";
// Define our custom Navbar

const MuiNavbar = () => {

    const pages = [
        {
          name: 'Home',
          to: '/home'
        },
        {
          name: 'About',
          to: '/about'
        },
        {
          name: 'Events',
          to: '/events'
        }
      ];
      const settings: string[] = ['settings'];
    
      const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
      const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    
      const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        // navigate
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

  return (
    <AppBar position='static' sx={{background:'white'}}>

        {/* pushing to left and right of the screen */}
        <Toolbar style={{justifyContent:'space-between'}}>

            {/* Icon and logo  */}
            <IconButton size = 'large' 
            component={Link}
            to="/"
            onClick={handleOpenNavMenu}
            edge = 'start' 
            color='inherit' 
            aria-label="logo">
                <ConfirmationNumberIcon className="navLogo"
                htmlColor='black' fontSize='large'/>
                <Typography className='logoTypo'component='div'>
                    MovieScape</Typography>
           </IconButton> 

                {/* Using a stack to have the other options */}
                <Stack direction={'row'}>
                    <Button className="stackBtn">Είσοδος/Σύνδεση</Button>
                <Tooltip title='Change Language'>
                <IconButton size="large" edge='end'>
                    <LanguageIcon htmlColor="black"/>
                </IconButton>
                </Tooltip>
                </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default MuiNavbar