import React from 'react';
import Footer from '../components/Footer';
import { Typography, Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import './AboutPage.css'

function AboutPage() {
  return (
      <div className='container'>
      <Stack direction={'column'}>
      <Typography sx={{marginTop:2, color:'black', fontSize:'x-large', marginLeft:2, fontWeight:'bolder'}}>ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ</Typography>
      <Divider variant="middle" style={{marginBottom:10, marginTop:10}} />
      <Typography sx={{color:'black', fontSize:'medium', marginLeft:2}}>Lore ipsum</Typography>
      
      </Stack>
      <Footer/>
      </div>
  );
}

export default AboutPage;
