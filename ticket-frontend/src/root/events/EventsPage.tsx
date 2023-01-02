import React from 'react';
import { Outlet } from 'react-router-dom';
import GridLayout from '../home/GridLayout';
import { Divider, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import Footer from '../components/Footer';

export default function EventsPage() {
  return (
    <React.Fragment>
      <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap', marginTop:10}}>
      <MovieIcon sx={{ marginLeft:4}} fontSize='large'/>
      <Typography sx={{color:'black', fontSize:'xx-large', marginLeft: 3, fontWeight:'bolder'}}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>
      </div>
      <Divider variant="middle"  style={{marginBottom:10}} />
      <GridLayout/>
      <Footer/>
        
      
      <Outlet />
    </React.Fragment>
  );
}
