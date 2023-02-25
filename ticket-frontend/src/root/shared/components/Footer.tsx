import { Box, Stack } from '@mui/system'
import React from 'react'
import { Button, Typography } from "@mui/material";
import { FacebookRounded } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
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
    // Defining a container box for the footer
    <Box height={'contain'} sx={{backgroundColor: '#E63946', marginTop:'auto'}} alignItems='center' display='block' justifyContent='center'>

      {/* Creating a stack for our social media buttons */}

      <Stack direction={'row'} justifyContent='center'>
        <FacebookRounded className='firstIcon' />
        <InstagramIcon className='instaTwitterIcon'/>
        <TwitterIcon className='instaTwitterIcon'/>
      </Stack>

      {/* Creating a stack for our 2 rows */}
      <Stack direction={'row'} justifyContent='space-evenly'> 

        {/* Creating the first row */}

        <Stack direction={'column'} justifyContent='center' alignItems={'center'} alignContent='center' display={'block'}>
          <Typography color={'white'} fontWeight={'bold'} variant='h5'>Εταιρεία</Typography>
          <Button className='actionButtons' component={Link} to={'/about'} key={'About'} onClick={handleCloseNavMenu}variant="text">Σχετικά με εμάς</Button>
        </Stack>

        {/* Creating the second row */}
        <Stack direction={'column'} justifyContent='flex-start' alignItems={'flex-start'} alignContent='center'>
          <Typography color={'white'}  fontWeight={'bold'} variant='h5' >Ταινίες</Typography>
          <Button  className='actionButtons' component={Link} to={'/events'} key={'Events'} onClick={handleCloseNavMenu} variant="text" >Παίζονται τώρα</Button>
          <Button className='actionButtons' variant="text">Προσεχώς</Button>
        </Stack>
          
      </Stack>
    </Box>
  )
}

export default Footer