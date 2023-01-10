import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tooltip } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { color, textTransform } from "@mui/system";
import './MuiNavbar.css'
import { Link } from "react-router-dom";
// Define our custom Navbar

const MuiNavbar = () => {

  const navbarLeftButtonsData = [
    {
      label: 'MovieScape',
      to: '/',
      icon: <ConfirmationNumberIcon className="navLogo" htmlColor='black' fontSize='large' />
    },
    {
      label: 'Προβολές',
      to: '/events',
      icon: <MovieIcon htmlColor='black' />
    },
    {
      label: 'Διαχείριση',
      to: '/admin',
      icon: <AdminPanelSettingsIcon htmlColor='black' />
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
    <AppBar position='static' sx={{ background: 'white' }}>

      {/* pushing to left and right of the screen */}
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
          {/* Icon and logo  */}
          {navbarLeftButtonsData.map((buttonData, index) => (
            <IconButton key={index} size='large'
              component={Link}
              to={buttonData.to}
              onClick={handleOpenNavMenu}
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

        <div>
          {/* Using a stack to have the other options */}
          <Stack direction={'row'}>
            <Button className="stackBtn" component={Link} to={'/login'}>Είσοδος/Σύνδεση</Button>
            <Tooltip title='Change Language'>
              <IconButton size="large" edge='end'>
                <LanguageIcon htmlColor="black" />
              </IconButton>
            </Tooltip>
          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default MuiNavbar