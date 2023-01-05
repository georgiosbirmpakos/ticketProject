import React from 'react'
import CarouselComponent from './Carousel';
import { Link } from 'react-router-dom'
import { Typography, Divider, Button } from '@mui/material';
import GridLayout from './GridLayout';
import MovieIcon from '@mui/icons-material/Movie';
import { Stack } from '@mui/system';
import '../shared/components/Footer.css';

const HomePage = () => {

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
    <React.Fragment>
      <CarouselComponent />

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Stack direction={'row'} alignContent='center' alignItems={'center'}>
          <MovieIcon sx={{ marginLeft: 4 }} fontSize='large' />
          <Typography sx={{ color: 'black', fontSize: 'xx-large', marginLeft: 2, fontWeight: 'bolder' }}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>

        </Stack>

        <Link to={'/events'}>
          <Button sx={{ color: 'black', textDecoration: 'underline', marginRight: 5 }}> ΟΛΕΣ ΟΙ ΤΑΙΝΙΕΣ </Button>
        </Link>
      </div>

      <Divider variant="middle" style={{ marginBottom: 10 }} />
      <GridLayout />
    </React.Fragment>
  )
}

export default HomePage
